import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/application/store';
import { setDraft } from '@/entities/session';
import { MessageComposer } from '@/shared/ui/message-composer';

type Props = {
  chatId: string;
};

export function SendMessageBar({ chatId }: Props) {
  const dispatch = useAppDispatch();
  const text = useAppSelector((s) => s.session.draftsByChatId[chatId] ?? '');

  const onChange = useCallback(
    (value: string) => {
      dispatch(setDraft({ chatId, text: value }));
    },
    [chatId, dispatch]
  );

  return (
    <MessageComposer
      value={text}
      onChangeText={onChange}
    />
  );
}
