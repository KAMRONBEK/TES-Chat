import { useLocalSearchParams } from 'expo-router';

import { ChatPage } from '@/pages/chat-page';

export default function ChatRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id || typeof id !== 'string') {
    return null;
  }

  return <ChatPage chatId={id} />;
}
