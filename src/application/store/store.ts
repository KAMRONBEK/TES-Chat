import '@/entities/chat/api/chatApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { sessionSlice } from '@/entities/session';
import { baseApi } from '@/shared/api/baseApi';

const sessionPersistConfig = {
  key: 'session',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  session: persistReducer(sessionPersistConfig, sessionSlice.reducer),
  [baseApi.reducerPath]: baseApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
