import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { appTheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/hooks';
import { TabsBottomTabBar } from '@/shared/ui/tabs-bottom-tab-bar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const t = appTheme[colorScheme];
  const isWeb = Platform.OS === 'web';

  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) => <TabsBottomTabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: !isWeb,
        tabBarActiveTintColor: t.tint,
        tabBarInactiveTintColor: t.textSecondary,
        tabBarStyle: {
          backgroundColor: t.tabBar,
          borderTopColor: t.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          ...(isWeb ? { width: '100%' as const, alignSelf: 'stretch' as const } : {}),
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '500' },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Contacts',
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calls"
        options={{
          title: 'Calls',
          tabBarLabel: 'Calls',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'call' : 'call-outline'} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={size ?? 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size ?? 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
