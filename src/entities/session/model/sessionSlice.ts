import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SessionState = {
  userId: string | null;
  draftsByChatId: Record<string, string>;
};

const initialState: SessionState = {
  userId: null,
  draftsByChatId: {},
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setDraft(state, action: PayloadAction<{ chatId: string; text: string }>) {
      const { chatId, text } = action.payload;
      if (text.length === 0) {
        delete state.draftsByChatId[chatId];
      } else {
        state.draftsByChatId[chatId] = text;
      }
    },
  },
});

export const { setDraft } = sessionSlice.actions;
