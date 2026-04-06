import { BottomTabBar, type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { appTheme } from '@/shared/config/theme';
import { useBreakpoint } from '@/shared/lib/hooks';
import { useColorScheme } from '@/shared/lib/hooks';

/**
 * Wide web: bottom tabs always sit under the master column width (same as Chats list), not
 * full viewport — consistent across Chats, Contacts, Calls, and Profile.
 */
export function TabsBottomTabBar(props: BottomTabBarProps) {
  const scheme = useColorScheme();
  const t = appTheme[scheme];
  const insets = useSafeAreaInsets();
  const { isWideWeb, sidebarWidth } = useBreakpoint();

  if (!isWideWeb) {
    return <BottomTabBar {...props} />;
  }

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.masterTabBarWrap,
        {
          width: sidebarWidth,
          paddingBottom: insets.bottom,
          backgroundColor: t.tabBar,
          borderTopColor: t.border,
        },
      ]}>
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  masterTabBarWrap: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    zIndex: 100,
  },
});
