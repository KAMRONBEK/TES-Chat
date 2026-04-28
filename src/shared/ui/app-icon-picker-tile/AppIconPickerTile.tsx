import { useTheme } from '@shopify/restyle';
import type { ImageSourcePropType, PressableProps } from 'react-native';
import { Image } from 'react-native';

import { Box, PressableBox, Text, type Theme } from '@/shared/ui/restyle';

const ICON = 54 as const;

export type AppIconPickerTileProps = {
  label: string;
  source: ImageSourcePropType;
  selected?: boolean;
  onPress?: PressableProps['onPress'];
  accessibilityLabel?: string;
  testID?: string;
};

/**
 * Single app-icon option: squircle preview + caption.
 * The bitmap is clipped in a plain 54×54 layer; the selection ring is overlaid so borders
 * never eat into the artwork (avoids RN’s border-in-layout-box cropping).
 * Inset matches design: padding inside the squircle so the glyph doesn’t hug the edges.
 */
export function AppIconPickerTile({
  label,
  source,
  selected = false,
  onPress,
  accessibilityLabel,
  testID,
}: AppIconPickerTileProps) {
  const { colors, spacing, borderWidths } = useTheme<Theme>();
  /** Outer size fixed so 1px idle vs 2px selected ring does not shift layout (+4 = both sides of max stroke). */
  const frameSide = ICON + spacing.xs * 2 + 2 * borderWidths.themePickerActive;

  return (
    <PressableBox
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      alignItems="center"
      padding="xs"
      style={({ pressed }) => [{ opacity: pressed && onPress ? 0.88 : 1 }]}
    >
      <Box
        width={frameSide}
        height={frameSide}
        padding="xs"
        backgroundColor="headerText"
        borderRadius="xl"
        borderWidth={selected ? borderWidths.themePickerActive : borderWidths.themePickerInactive}
        borderColor={selected ? 'appIconPickerSelectedBorder' : 'themePickerInactiveBorder'}
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
      >
        <Image source={source} resizeMode="contain" style={{ width: ICON, height: ICON }} />
      </Box>
      <Text
        marginTop="xs"
        fontSize={13}
        fontWeight="500"
        color="textPrimary"
        textAlign="center"
        style={selected ? { color: colors.appIconPickerSelectedLabel } : undefined}
      >
        {label}
      </Text>
    </PressableBox>
  );
}
