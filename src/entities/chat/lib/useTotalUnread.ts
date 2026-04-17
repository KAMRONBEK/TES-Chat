import { useMemo } from 'react';

import { useGetChatsQuery } from '../api/chatApi';

export function useTotalUnread(): number {
  const { data: chats } = useGetChatsQuery();
  return useMemo(() => (chats ?? []).reduce((sum, c) => sum + c.unread, 0), [chats]);
}
