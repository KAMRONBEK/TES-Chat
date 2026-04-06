import { BottomTabBar, type BottomTabBarProps } from '@react-navigation/bottom-tabs';

/**
 * Default bottom tab bar (native + compact web). Wide-web master-column variant lives in
 * `TabsBottomTabBar.web.tsx`.
 */
export function TabsBottomTabBar(props: BottomTabBarProps) {
  return <BottomTabBar {...props} />;
}
