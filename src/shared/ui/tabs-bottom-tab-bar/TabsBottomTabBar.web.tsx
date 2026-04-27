import { BottomTabBar, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBreakpoint } from '@/shared/lib/hooks';
import { Box, type Theme } from '@/shared/ui/restyle';

import { BOTTOM_TAB_BAR_TOP_BORDER } from './constants';

/**
 * Wide web: bottom tabs sit under the master column width (same as Chats list),
 * not the full viewport.
 */
export function TabsBottomTabBar(props: BottomTabBarProps) {
  const { colors } = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const { isWideWeb, sidebarWidth } = useBreakpoint();

  if (!isWideWeb) {
    return <BottomTabBar {...props} />;
  }

  return (
    <Box
      pointerEvents="box-none"
      position="absolute"
      left={0}
      bottom={0}
      style={{
        width: sidebarWidth,
        paddingBottom: insets.bottom,
        backgroundColor: colors.tabBar,
        borderTopColor: colors.border,
        borderTopWidth: BOTTOM_TAB_BAR_TOP_BORDER,
        zIndex: 100,
      }}
    >
      <BottomTabBar {...props} />
    </Box>
  );
}
