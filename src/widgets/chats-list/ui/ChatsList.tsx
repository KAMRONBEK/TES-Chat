import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Chat } from '@/entities/chat';
import { useGetChatsQuery } from '@/entities/chat';
import { appTheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/hooks';

const AVATAR_COLORS = ['#5B9BD5', '#70B477', '#9B7ED9', '#E67A7A', '#D4A35B', '#5C9EAD', '#4A90D9'];

function avatarColor(title: string): string {
  let h = 0;
  for (let i = 0; i < title.length; i++) {
    h = title.charCodeAt(i) + ((h << 5) - h);
  }
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

export type ChatsListProps = {
  /** When set, called instead of navigating to `/chat/[id]` (e.g. wide web split). */
  onChatPress?: (chatId: string) => void;
  /** Highlights the active row (split layout). */
  selectedChatId?: string | null;
  /** Filters the list by title / last message (client-side). */
  searchQuery?: string;
};

export function ChatsList({ onChatPress, selectedChatId, searchQuery = '' }: ChatsListProps) {
  const router = useRouter();
  const scheme = useColorScheme();
  const t = appTheme[scheme];
  const { data, isLoading, isError } = useGetChatsQuery();

  const rows = useMemo(() => {
    if (!data) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  const handlePress = (id: string) => {
    if (onChatPress) {
      onChatPress(id);
    } else {
      router.push(`/chat/${id}`);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: t.chatListScreenBg }]}>
        <ActivityIndicator color={t.tint} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={[styles.center, { backgroundColor: t.chatListScreenBg }]}>
        <Text style={{ color: t.textSecondary }}>Could not load chats</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={rows}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        styles.listContent,
        { backgroundColor: t.chatListScreenBg },
        rows.length === 0 ? styles.listEmpty : undefined,
      ]}
      ListHeaderComponent={
        rows.length > 0 ? (
          <Text style={[styles.sectionLabel, { color: t.textSecondary }]}>All chats</Text>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.emptyWrap}>
          <Text style={[styles.emptyText, { color: t.textSecondary }]}>No chats found</Text>
        </View>
      }
      ItemSeparatorComponent={() => (
        <View style={[styles.separatorInset, { backgroundColor: t.chatListRow }]}>
          <View style={[styles.separatorLine, { borderBottomColor: t.rowSeparator }]} />
        </View>
      )}
      renderItem={({ item }) => (
        <ChatRow
          chat={item}
          scheme={scheme}
          avatarBg={avatarColor(item.title)}
          selected={item.id === selectedChatId}
          onPress={() => handlePress(item.id)}
        />
      )}
    />
  );
}

function ChatRow({
  chat,
  onPress,
  scheme,
  avatarBg,
  selected,
}: {
  chat: Chat;
  onPress: () => void;
  scheme: 'light' | 'dark';
  avatarBg: string;
  selected: boolean;
}) {
  const t = appTheme[scheme];
  const bg = selected ? t.listItemActive : t.chatListRow;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: pressed ? t.chatListRowPressed : bg,
        },
      ]}>
      <View style={[styles.avatar, { backgroundColor: avatarBg }]}>
        <Text style={styles.avatarText}>{chat.title.slice(0, 1).toUpperCase()}</Text>
      </View>
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text style={[styles.title, { color: t.textPrimary }]} numberOfLines={1}>
            {chat.title}
          </Text>
          <Text style={[styles.time, { color: t.messageTime }]}>{chat.time}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={[styles.preview, { color: t.textSecondary }]} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unread > 0 ? (
            <View style={[styles.badge, { backgroundColor: t.badgeUnread }]}>
              <Text style={[styles.badgeText, { color: t.badgeText }]}>{chat.unread}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { flexGrow: 1, paddingBottom: 8 },
  listEmpty: { flexGrow: 1 },
  sectionLabel: { fontSize: 15, fontWeight: '500', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  emptyWrap: { paddingTop: 48, alignItems: 'center' },
  emptyText: { fontSize: 16 },
  row: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 9,
    minHeight: 72,
    alignItems: 'center',
  },
  separatorInset: {
    paddingLeft: 80,
  },
  separatorLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: '600' },
  rowBody: { flex: 1, justifyContent: 'center', minHeight: 56 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 },
  title: { fontSize: 17, fontWeight: '500', flex: 1, marginRight: 8 },
  time: { fontSize: 15 },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  preview: { fontSize: 16, flex: 1, marginRight: 8, fontWeight: '400' },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 13, fontWeight: '600' },
});
