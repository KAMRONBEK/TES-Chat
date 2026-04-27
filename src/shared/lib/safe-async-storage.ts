import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage calls that always resolve, never reject — needed when the native
 * module is missing or mislinked so UI code does not hit unhandled rejections.
 */
export function safeAsyncStorageGetItem(key: string): Promise<string | null> {
  try {
    return AsyncStorage.getItem(key).catch(() => null);
  } catch {
    return Promise.resolve(null);
  }
}

export function safeAsyncStorageSetItem(key: string, value: string): Promise<void> {
  try {
    return AsyncStorage.setItem(key, value).catch(() => {
      // ignore — persist optional when storage is unavailable
    });
  } catch {
    return Promise.resolve();
  }
}
