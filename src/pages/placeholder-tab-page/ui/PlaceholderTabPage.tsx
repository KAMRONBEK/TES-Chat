import { StyleSheet, Text, View } from 'react-native';

import { appTheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/hooks';

type Props = {
  title: string;
};

export function PlaceholderTabPage({ title }: Props) {
  const scheme = useColorScheme();
  const t = appTheme[scheme];

  return (
    <View style={[styles.root, { backgroundColor: t.chatListScreenBg }]}>
      <Text style={[styles.title, { color: t.textPrimary }]}>{title}</Text>
      <Text style={[styles.hint, { color: t.textSecondary }]}>Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  hint: { fontSize: 16 },
});
