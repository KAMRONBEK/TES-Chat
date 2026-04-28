import { useTheme } from '@shopify/restyle';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useGetChatsQuery } from '@/entities/chat';
import { SendMessageBar } from '@/features/send-message';
import { Box, CustomStatusBar, type Theme } from '@/shared/ui';
import { ChatHeader } from '@/widgets/chat-header';
import { MessageList } from '@/widgets/message-list';

type Props = {
  chatId: string;
  /** Rendered inside wide-web split pane (no back, no duplicate status bar). */
  embedded?: boolean;
};

export function ChatPage({ chatId, embedded = false }: Props) {
  const router = useRouter();
  const theme = useTheme<Theme>();
  const { data: chats } = useGetChatsQuery();
  const chat = useMemo(() => chats?.find((c) => c.id === chatId), [chats, chatId]);
  const title = chat?.title ?? 'Chat';

  /** Split-pane chat lives on `/?chatId=` — going “back” must clear selection, not browser history (Contacts, etc.). */
  const onBackPress = useCallback(() => {
    if (embedded) {
      router.replace('/(tabs)');
      return;
    }
    router.back();
  }, [embedded, router]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.chatWallpaper }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      {!embedded ? <CustomStatusBar /> : null}
      <ChatHeader
        title={title}
        subtitle={chat?.subtitle}
        savedMessages={chat?.savedMessages}
        onBackPress={onBackPress}
      />
      <Box flex={1}>
        <MessageList chatId={chatId} />
      </Box>
      <SendMessageBar chatId={chatId} />
    </KeyboardAvoidingView>
  );
}
