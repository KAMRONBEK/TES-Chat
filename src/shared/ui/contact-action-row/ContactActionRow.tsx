import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

import { ListRowSeparator } from '@/shared/ui/list-row-separator';
import { Box, PressableBox, Text, type Theme } from '@/shared/ui/restyle';

const ROW_LAYOUT = {
  backgroundColor: 'chatListRow',
  paddingHorizontal: 'md',
  paddingVertical: 'sm',
  minHeight: 48,
  flexDirection: 'row',
  alignItems: 'center',
} as const satisfies Record<string, unknown>;

/** Left inset so the divider aligns with the label (past icon + gap). */
export function contactActionRowDividerInsetLeft(
  spacing: Pick<Theme['spacing'], 'md'>,
  iconSize: number,
  hasLeading: boolean
): number {
  if (!hasLeading) {
    return spacing.md;
  }
  return spacing.md + iconSize + spacing.md;
}

export type ContactActionRowProps = {
  label: string;
  /** Renders a leading `Ionicons` glyph tinted to match the label. Ignored when `leading` is set. */
  ionicon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  /** Custom leading content (e.g. non-Ionicons). You should tint it yourself, or rely on default accent in children via `useTheme`. */
  leading?: ReactNode;
  onPress?: PressableProps['onPress'];
  showDivider?: boolean;
  dividerInsetLeft?: number;
  disabled?: boolean;
  /** Restyle color token for icon + label; default `contactActionRowAccent`. */
  accentColor?: keyof Theme['colors'];
  testID?: string;
  accessibilityLabel?: string;
};

/**
 * Contacts list — prominent action row: leading icon + single accent label, chat-list surface
 * and optional inset divider (Telegram-style “Add People Nearby” pattern).
 */
export function ContactActionRow({
  label,
  ionicon,
  iconSize = 24,
  leading,
  onPress,
  showDivider = true,
  dividerInsetLeft: dividerInsetLeftProp,
  disabled = false,
  accentColor = 'contactActionRowAccent',
  testID,
  accessibilityLabel,
}: ContactActionRowProps) {
  const { colors, spacing } = useTheme<Theme>();
  const hasCustomLeading = leading != null;
  const hasIonicon = ionicon != null && !hasCustomLeading;
  const hasLeading = hasCustomLeading || hasIonicon;
  const dividerInset =
    dividerInsetLeftProp ?? contactActionRowDividerInsetLeft(spacing, iconSize, hasLeading);
  const isPressable = onPress != null;
  const tint = colors[accentColor];

  const leadingNode = hasCustomLeading ? (
    <Box marginRight="md" flexShrink={0}>
      {leading}
    </Box>
  ) : hasIonicon ? (
    <Box marginRight="md" flexShrink={0}>
      <Ionicons name={ionicon} size={iconSize} color={tint} />
    </Box>
  ) : null;

  const inner = (
    <>
      {leadingNode}
      <Text
        fontSize={17}
        lineHeight={22}
        fontWeight="400"
        color={accentColor}
        flex={1}
        numberOfLines={1}
        style={{ minWidth: 0 }}
      >
        {label}
      </Text>
    </>
  );

  return (
    <Box alignSelf="stretch">
      {isPressable ? (
        <PressableBox
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          accessibilityLabel={accessibilityLabel ?? label}
          testID={testID}
          {...ROW_LAYOUT}
          style={({ pressed }) =>
            pressed && !disabled ? { backgroundColor: colors.chatListRowPressed } : undefined
          }
        >
          {inner}
        </PressableBox>
      ) : (
        <Box
          accessible
          accessibilityLabel={accessibilityLabel ?? label}
          testID={testID}
          {...ROW_LAYOUT}
        >
          {inner}
        </Box>
      )}
      {showDivider ? (
        <ListRowSeparator insetLeft={dividerInset} backgroundColor="chatListRow" />
      ) : null}
    </Box>
  );
}
