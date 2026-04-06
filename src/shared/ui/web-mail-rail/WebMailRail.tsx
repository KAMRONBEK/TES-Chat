import { Ionicons } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { appTheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/hooks';

type IconName = ComponentProps<typeof Ionicons>['name'];

type RailItem = {
  key: string;
  label: string;
  href: string;
  icon: IconName;
  iconOutline: IconName;
};

const RAIL_ITEMS: RailItem[] = [
  {
    key: 'contacts',
    label: 'Contacts',
    href: '/(tabs)/contacts',
    icon: 'people',
    iconOutline: 'people-outline',
  },
  {
    key: 'calls',
    label: 'Calls',
    href: '/(tabs)/calls',
    icon: 'call',
    iconOutline: 'call-outline',
  },
  {
    key: 'index',
    label: 'Chats',
    href: '/(tabs)',
    icon: 'chatbubbles',
    iconOutline: 'chatbubbles-outline',
  },
  {
    key: 'profile',
    label: 'Profile',
    href: '/(tabs)/profile',
    icon: 'person',
    iconOutline: 'person-outline',
  },
];

/**
 * Telegram Web–style vertical icon rail for wide desktop layouts.
 */
export function WebMailRail() {
  const scheme = useColorScheme();
  const t = appTheme[scheme];
  const router = useRouter();
  const segments = useSegments();
  const rest = segments.filter((s) => s !== '(tabs)');
  const activeKey = rest.length === 0 ? 'index' : (rest[rest.length - 1] ?? 'index');

  return (
    <View style={[styles.rail, { backgroundColor: t.railBg, borderRightColor: t.splitBorder }]}>
      <View style={styles.spacer} />
      <View style={styles.icons}>
        {RAIL_ITEMS.map((item) => {
          const focused = activeKey === item.key;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => router.push(item.href as never)}
              style={({ pressed }) => [
                styles.item,
                focused && [styles.itemActive, { backgroundColor: t.railItemActive }],
                pressed && styles.pressed,
              ]}>
              <Ionicons
                name={focused ? item.icon : item.iconOutline}
                size={24}
                color={focused ? t.tint : t.textSecondary}
              />
              <Text
                style={[styles.label, { color: focused ? t.tint : t.textSecondary }]}
                numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rail: {
    width: 72,
    flexShrink: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  spacer: { flex: 1, minHeight: 24 },
  icons: {
    width: '100%',
    paddingBottom: 16,
    gap: 4,
    alignItems: 'center',
  },
  item: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  itemActive: {},
  pressed: { opacity: 0.75 },
  label: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
});
