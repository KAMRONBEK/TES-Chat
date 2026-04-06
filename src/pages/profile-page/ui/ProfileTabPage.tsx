import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlaceholderTabPage } from '@/pages/placeholder-tab-page';
import { appTheme } from '@/shared/config/theme';
import { useBreakpoint } from '@/shared/lib/hooks';
import { useColorScheme } from '@/shared/lib/hooks';

type Props = {
  /** Wide web: two columns like Chats — master (profile) left, empty detail right. */
  splitMode?: boolean;
};

export function ProfileTabPage({ splitMode = false }: Props) {
  const scheme = useColorScheme();
  const t = appTheme[scheme];
  const insets = useSafeAreaInsets();
  const { sidebarWidth } = useBreakpoint();

  if (!splitMode) {
    return <PlaceholderTabPage title="Profile" />;
  }

  return (
    <View style={styles.splitRoot}>
      <View style={[styles.splitLeft, { width: sidebarWidth, borderRightColor: t.splitBorder }]}>
        <StatusBar style="light" />
        <View style={[styles.navBar, { backgroundColor: t.navBar, paddingTop: insets.top }]}>
          <Text style={[styles.navTitle, { color: t.navBarText }]}>Profile</Text>
        </View>
        <View style={[styles.masterBody, { backgroundColor: t.chatListScreenBg }]}>
          <Text style={[styles.title, { color: t.textPrimary }]}>Profile</Text>
          <Text style={[styles.hint, { color: t.textSecondary }]}>Coming soon</Text>
        </View>
      </View>
      <View style={[styles.splitRight, { backgroundColor: t.chatWallpaper }]}>
        <View style={styles.splitEmpty}>
          <Ionicons name="person-outline" size={56} color={t.splitEmptyText} />
          <Text style={[styles.splitEmptyTitle, { color: t.textSecondary }]}>
            Your profile details will appear here
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splitRoot: { flex: 1, flexDirection: 'row', minHeight: 0 },
  splitLeft: {
    flexShrink: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  splitRight: { flex: 1, minWidth: 0 },
  navBar: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  navTitle: { fontSize: 17, fontWeight: '600' },
  masterBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  hint: { fontSize: 16 },
  splitEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  splitEmptyTitle: { marginTop: 16, fontSize: 16, textAlign: 'center' },
});
