import Constants from 'expo-constants';

type Extra = {
  apiBaseUrl?: string;
  realtimeUrl?: string;
};

function getExtra(): Extra {
  return (Constants.expoConfig?.extra ?? {}) as Extra;
}

export const env = {
  get apiBaseUrl() {
    return getExtra().apiBaseUrl ?? 'https://api.example.com/';
  },
  get realtimeUrl() {
    return getExtra().realtimeUrl ?? 'wss://echo.websocket.org/';
  },
};
