import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, PressableBox } from '@/shared/ui/restyle';
import type { Theme } from '@/shared/ui/restyle/theme';
import { BOTTOM_TAB_BAR_HEIGHT } from '@/shared/ui/tabs-bottom-tab-bar';

const ICON_OUTER = 26;
const STICKER_ICON = 24;
const ICON_SEND = 24;
/** Min outer height of the bordered field (text + vertical padding). */
const FIELD_OUTER_MIN = 44;
const COMPOSER_V_PAD = 8;
/** Min height of the text area (FIELD_OUTER_MIN minus vertical padding on the field). */
const TEXT_INNER_MIN = FIELD_OUTER_MIN - COMPOSER_V_PAD * 2;

const PRESSED_OPACITY = 0.65;

export type MessageComposerProps = {
  value: string;
  onChangeText: (text: string) => void;
  onAttachPress?: () => void;
  onStickersPress?: () => void;
  onVoiceOrSendPress?: () => void;
  placeholder?: string;
  maxLength?: number;
  testID?: string;
};

export function MessageComposer({
  value,
  onChangeText,
  onAttachPress,
  onStickersPress,
  onVoiceOrSendPress,
  placeholder = 'Message',
  maxLength = 4096,
  testID,
}: MessageComposerProps) {
  const { colors: t, borderWidths: bw } = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const { height: winH } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const hasText = value.trim().length > 0;

  const textMaxInner = Math.min(320, Math.floor(winH * 0.42));
  const [textContentH, setTextContentH] = useState(TEXT_INNER_MIN);
  /** iOS: `contentSize.height` is unreliable with multiline; only used for scroll vs max. */
  const [iosRawContentH, setIosRawContentH] = useState(0);

  useEffect(() => {
    if (value.length === 0) {
      setTextContentH(TEXT_INNER_MIN);
      setIosRawContentH(0);
    }
  }, [value]);

  const textDisplayH = Math.max(TEXT_INNER_MIN, Math.min(textMaxInner, textContentH));
  const atMinHeight = textContentH <= TEXT_INNER_MIN + 1;
  const shouldScrollNonIos = textContentH > textMaxInner + 0.5;
  const shouldScrollIos = iosRawContentH > textMaxInner + 0.5;
  const fieldHeight = textDisplayH + COMPOSER_V_PAD * 2;

  const barBottomPad = isWeb ? insets.bottom : Math.max(insets.bottom, 8);

  return (
    <Box
      flexDirection="row"
      alignItems={atMinHeight ? 'center' : 'flex-end'}
      backgroundColor="composerBar"
      borderTopWidth={bw.hairline}
      borderTopColor="composerBarTop"
      gap="smd"
      paddingHorizontal="sm"
      paddingTop={isWeb ? 'none' : 'sm'}
      paddingBottom="none"
      minHeight={isWeb ? BOTTOM_TAB_BAR_HEIGHT : undefined}
      style={{ paddingBottom: barBottomPad }}
    >
      <PressableBox
        accessibilityRole="button"
        accessibilityLabel="Attach"
        onPress={onAttachPress}
        hitSlop={8}
        width={32}
        minHeight={FIELD_OUTER_MIN}
        alignItems="center"
        justifyContent="center"
        style={({ pressed }) => ({ opacity: pressed ? PRESSED_OPACITY : 1 })}
      >
        <Ionicons name="attach-outline" size={ICON_OUTER} color={t.composerIcon} />
      </PressableBox>

      <Box
        flex={1}
        minWidth={0}
        flexDirection="row"
        alignItems={atMinHeight ? 'center' : 'flex-end'}
        borderWidth={bw.hairline}
        borderColor="composerFieldBorder"
        backgroundColor="composerField"
        borderRadius={atMinHeight ? 'full' : 'actionSheet'}
        paddingLeft="md"
        paddingRight="xs"
        paddingVertical="sm"
        minHeight={fieldHeight}
      >
        <TextInput
          testID={testID}
          {...(isWeb ? { dataSet: { messageComposer: 'true' } as const } : {})}
          style={[
            styles.input,
            {
              color: t.textPrimary,
              maxHeight: textMaxInner,
              ...Platform.select({
                ios: {
                  minHeight: TEXT_INNER_MIN,
                  // No fixed `height`: iOS often reports bogus `contentSize` when height is set, which
                  // leaves a huge empty gap after a newline.
                },
                default: {
                  height: textDisplayH,
                },
              }),
            },
            Platform.select({
              android: {
                textAlignVertical: atMinHeight ? 'center' : 'top',
              },
              // Keep vertical padding out of the iOS multiline path — it fights intrinsic layout height.
              ios: { paddingTop: 0 },
              web: { outlineWidth: 0, boxShadow: 'none' },
              default: {},
            }),
          ]}
          placeholder={placeholder}
          placeholderTextColor={t.composerIcon}
          value={value}
          onChangeText={onChangeText}
          onLayout={(e) => {
            if (Platform.OS !== 'ios') {
              return;
            }
            const h = e.nativeEvent.layout.height;
            if (h <= 0) {
              return;
            }
            const clamped = Math.max(TEXT_INNER_MIN, Math.min(textMaxInner, h));
            setTextContentH((prev) => (Math.abs(prev - clamped) < 0.5 ? prev : clamped));
          }}
          onContentSizeChange={(e) => {
            const h = e.nativeEvent.contentSize.height;
            if (h <= 0) {
              return;
            }
            if (Platform.OS === 'ios') {
              setIosRawContentH(h);
              return;
            }
            setTextContentH(h);
          }}
          multiline
          maxLength={maxLength}
          scrollEnabled={Platform.OS === 'ios' ? shouldScrollIos : shouldScrollNonIos}
          underlineColorAndroid="transparent"
        />
        <PressableBox
          accessibilityRole="button"
          accessibilityLabel="Stickers and emoji"
          onPress={onStickersPress}
          hitSlop={8}
          width={36}
          minHeight={32}
          marginBottom={!atMinHeight && Platform.OS === 'ios' ? 'xxs' : 'none'}
          alignItems="center"
          justifyContent="center"
          style={({ pressed }) => ({ opacity: pressed ? PRESSED_OPACITY : 1 })}
        >
          <Ionicons name="happy-outline" size={STICKER_ICON} color={t.composerIcon} />
        </PressableBox>
      </Box>

      <PressableBox
        accessibilityRole="button"
        accessibilityLabel={hasText ? 'Send' : 'Voice message'}
        onPress={onVoiceOrSendPress}
        hitSlop={8}
        width={32}
        minHeight={FIELD_OUTER_MIN}
        alignItems="center"
        justifyContent="center"
        style={({ pressed }) => ({ opacity: pressed ? PRESSED_OPACITY : 1 })}
      >
        <Ionicons
          name={hasText ? 'send-outline' : 'mic-outline'}
          size={hasText ? ICON_SEND : ICON_OUTER}
          color={hasText ? t.composerSend : t.composerIcon}
        />
      </PressableBox>
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 0,
    marginRight: 2,
    ...Platform.select({ android: { paddingVertical: 0 } }),
  },
});
