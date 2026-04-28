import { useRouter } from 'expo-router';

import { ChatThreadNavigationBar } from '@/shared/ui';

type Props = {
  title: string;
  /** Line under the name (status, presence, group meta). Defaults when omitted. */
  subtitle?: string | null;
  /** Peek preview: minimal header (no subtitle). */
  preview?: boolean;
  /** Saved Messages thread — gradient avatar. */
  savedMessages?: boolean;
  /** Optional avatar photo when available. */
  avatarUri?: string | null;
  /**
   * Defaults to `router.back()`.
   * Wide-web split chats pass a handler that clears `chatId` — `router.back()` would follow browser history (e.g. to Contacts).
   */
  onBackPress?: () => void;
};

export function ChatHeader({
  title,
  subtitle,
  preview = false,
  savedMessages = false,
  avatarUri,
  onBackPress: onBackPressProp,
}: Props) {
  const router = useRouter();
  const resolvedSubtitle = preview ? undefined : (subtitle ?? 'last seen recently');
  const onBackPress = onBackPressProp ?? (() => router.back());

  return (
    <ChatThreadNavigationBar
      title={title}
      subtitle={resolvedSubtitle}
      preview={preview}
      savedMessages={savedMessages}
      avatarUri={avatarUri}
      onBackPress={onBackPress}
    />
  );
}
