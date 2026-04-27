import { useTheme } from '@shopify/restyle';
import { type PressableProps } from 'react-native';

import type { ThemePickerTilePreview } from '@/shared/config/theme';
import { Box, PressableBox, Text, type Theme } from '@/shared/ui/restyle';

import { ThemePickerTileBubblePair } from './ThemePickerTileBubblePair';

export type { ThemePickerTilePreview };

export type ThemePickerTileProps = {
  label: string;
  selected?: boolean;
  preview: ThemePickerTilePreview;
  onPress?: PressableProps['onPress'];
  accessibilityLabel?: string;
  testID?: string;
};

/** Mini chat preview size — tuned so tile ≈ design ref (~98×89) with label + padding. */
const PREVIEW = { width: 86, height: 52 } as const;

/**
 * Single appearance theme card: mini conversation preview + caption; selection ring wraps the preview only.
 * Pass `preview` colors from {@link themePickerTilePresets} in `@/shared/config/theme` or your own palette.
 */
export function ThemePickerTile({
  label,
  selected = false,
  preview,
  onPress,
  accessibilityLabel,
  testID,
}: ThemePickerTileProps) {
  const { colors, borderWidths } = useTheme<Theme>();
  const previewFrameStyle = {
    borderWidth: selected ? borderWidths.themePickerActive : borderWidths.themePickerInactive,
    borderColor: selected ? colors.themePickerActiveBorder : colors.themePickerInactiveBorder,
  };

  return (
    <PressableBox
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      alignItems="center"
      padding="xs"
      style={({ pressed }) => [{ opacity: pressed && onPress ? 0.88 : 1 }]}>
      <Box
        width={PREVIEW.width}
        height={PREVIEW.height}
        borderRadius="messageBubble"
        overflow="hidden"
        style={[{ backgroundColor: preview.wallpaper }, previewFrameStyle]}
      >
        <ThemePickerTileBubblePair
          incoming={preview.bubbleIncoming}
          outgoing={preview.bubbleOutgoing}
        />
      </Box>
      <Text
        marginTop="xs"
        fontSize={13}
        fontWeight="500"
        color="textPrimary"
        textAlign="center"
        style={selected ? { color: colors.themePickerActiveBorder } : undefined}>
        {label}
      </Text>
    </PressableBox>
  );
}
