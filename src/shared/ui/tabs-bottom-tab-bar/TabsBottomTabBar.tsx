import { BottomTabBar, type BottomTabBarProps } from '@react-navigation/bottom-tabs';

/**
 * Bottom tab bar for native and compact web.
 * Wide-web master-column variant lives in `TabsBottomTabBar.web.tsx`.
 * Theme colors are applied via screenOptions in the tab layout.
 */
export function TabsBottomTabBar(props: BottomTabBarProps) {
  return <BottomTabBar {...props} />;
}
