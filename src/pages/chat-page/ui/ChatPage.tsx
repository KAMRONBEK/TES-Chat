import { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { useGetChatsQuery } from '@/entities/chat';
import { SendMessageBar } from '@/features/send-message';
import { appTheme } from '@/shared/config/theme';
import { useColorScheme } from '@/shared/lib/hooks';
import { CustomStatusBar } from '@/shared/ui';
import { ChatHeader } from '@/widgets/chat-header';
import { MessageList } from '@/widgets/message-list';

type Props = {
  chatId: string;
  /** Rendered inside wide-web split pane (no back, no duplicate status bar). */
  embedded?: boolean;
};

export function ChatPage({ chatId, embedded = false }: Props) {
  const scheme = useColorScheme();
  const t = appTheme[scheme];
  const { data: chats } = useGetChatsQuery();
  const title = useMemo(() => chats?.find((c) => c.id === chatId)?.title ?? 'Chat', [chats, chatId]);

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: t.chatWallpaper }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      {!embedded ? <CustomStatusBar overrideStyle="light" /> : null}
      <ChatHeader title={title} embedded={embedded} />
      <View style={styles.flex}>
        <MessageList chatId={chatId} />
      </View>
      <SendMessageBar chatId={chatId} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
});
