import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';

import { Box, type Theme } from '@/shared/ui/restyle';

const ICON_SIZE = 18;

/** Speaker-off indicator shown inline after the chat title when the chat is muted. */
export function InlineMuteIcon() {
  const { colors } = useTheme<Theme>();

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      accessibilityRole="image"
      accessibilityLabel="Muted"
    >
      <Ionicons name="volume-mute-outline" size={ICON_SIZE} color={colors.chatInlineMuteIcon} />
    </Box>
  );
}
