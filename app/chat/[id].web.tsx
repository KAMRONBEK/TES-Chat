import { type Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { ChatPage } from '@/pages/chat-page';
import { useBreakpoint } from '@/shared/lib/hooks';

export default function ChatRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isWideWeb } = useBreakpoint();

  useEffect(() => {
    if (!isWideWeb || !id) return;
    router.replace(`/?chatId=${encodeURIComponent(id)}` as Href);
  }, [id, isWideWeb, router]);

  if (isWideWeb) {
    return <View style={{ flex: 1 }} />;
  }

  if (!id || typeof id !== 'string') {
    return null;
  }

  return <ChatPage chatId={id} />;
}
