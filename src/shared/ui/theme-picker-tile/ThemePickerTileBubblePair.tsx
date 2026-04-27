import { useTheme } from '@shopify/restyle';

import { Box, type Theme } from '@/shared/ui/restyle';

export type ThemePickerTileBubblePairProps = {
  incoming: string;
  outgoing: string;
};

/** Preview bubble strip heights — tuned to the mini preview frame in ThemePickerTile. */
const INCOMING_BAR_HEIGHT = 14;
const OUTGOING_BAR_HEIGHT = 15;

/** Stylized incoming (left) + outgoing (right) bubbles for theme picker preview tiles. */
export function ThemePickerTileBubblePair({ incoming, outgoing }: ThemePickerTileBubblePairProps) {
  const { borderRadii, spacing } = useTheme<Theme>();
  const tail = spacing.smd;

  const incomingMainRadii = {
    borderBottomLeftRadius: borderRadii.xs,
    borderTopLeftRadius: borderRadii.md,
    borderTopRightRadius: borderRadii.md,
    borderBottomRightRadius: borderRadii.md,
  };
  const outgoingMainRadii = {
    borderBottomRightRadius: borderRadii.xs,
    borderTopLeftRadius: borderRadii.md,
    borderTopRightRadius: borderRadii.md,
    borderBottomLeftRadius: borderRadii.md,
  };
  const tailCorner = { borderBottomLeftRadius: borderRadii.xxs };
  const tailCornerOutgoing = { borderBottomRightRadius: borderRadii.xxs };

  return (
    <Box flex={1} justifyContent="space-between" padding="sm">
      <Box alignSelf="flex-start" width="72%" position="relative">
        <Box
          height={INCOMING_BAR_HEIGHT}
          style={[{ backgroundColor: incoming }, incomingMainRadii]}
        />
        <Box
          position="absolute"
          bottom={-spacing.xxs}
          left={spacing.xxs}
          width={tail}
          height={tail}
          style={[
            { backgroundColor: incoming, transform: [{ rotate: '45deg' }] },
            tailCorner,
          ]}
        />
      </Box>
      <Box alignSelf="flex-end" width="78%" position="relative">
        <Box
          height={OUTGOING_BAR_HEIGHT}
          style={[{ backgroundColor: outgoing }, outgoingMainRadii]}
        />
        <Box
          position="absolute"
          bottom={-spacing.xxs}
          right={spacing.xxs}
          width={tail}
          height={tail}
          style={[
            { backgroundColor: outgoing, transform: [{ rotate: '45deg' }] },
            tailCornerOutgoing,
          ]}
        />
      </Box>
    </Box>
  );
}
