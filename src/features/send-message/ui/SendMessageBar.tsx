import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector } from '@/application/store';
import { setDraft } from '@/entities/session';
import { appTheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/hooks';

type Props = {
  chatId: string;
};

export function SendMessageBar({ chatId }: Props) {
  const dispatch = useAppDispatch();
  const scheme = useColorScheme();
  const t = appTheme[scheme];
  const insets = useSafeAreaInsets();
  const text = useAppSelector((s) => s.session.draftsByChatId[chatId] ?? '');
  const hasText = text.trim().length > 0;

  const onChange = useCallback(
    (value: string) => {
      dispatch(setDraft({ chatId, text: value }));
    },
    [chatId, dispatch]
  );

  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: t.composerBar,
          borderTopColor: t.border,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}>
      <Pressable style={[styles.attach, { borderColor: t.composerFieldBorder }]} hitSlop={8}>
        <Ionicons name="attach" size={24} color={t.composerIcon} />
      </Pressable>
      <View style={[styles.fieldWrap, { backgroundColor: t.composerField, borderColor: t.composerFieldBorder }]}>
        <TextInput
          style={[styles.input, { color: t.textPrimary }]}
          placeholder="Message"
          placeholderTextColor={t.textSecondary}
          value={text}
          onChangeText={onChange}
          multiline
          maxLength={4096}
        />
      </View>
      <Pressable
        style={[
          styles.sendFab,
          {
            backgroundColor: hasText
              ? t.sendButton
              : scheme === 'light'
                ? '#A8A8AD'
                : '#4A5058',
          },
        ]}
        hitSlop={8}>
        <Ionicons name={hasText ? 'send' : 'mic'} size={22} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 8,
    paddingTop: 8,
    gap: 8,
  },
  attach: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  fieldWrap: {
    flex: 1,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 44,
    maxHeight: 120,
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: {
    fontSize: 17,
    maxHeight: 100,
    lineHeight: 22,
    paddingVertical: 0,
  },
  sendFab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
});
