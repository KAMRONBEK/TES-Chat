import { type Href, useRouter } from 'expo-router';
import { useCallback } from 'react';

export type SplitTabParamName = 'chatId';

/**
 * Wide split: updates the current tab route search param. Otherwise pushes a stack path.
 */
export function useSplitTabNavigation<T extends SplitTabParamName>(options: {
  splitMode: boolean;
  paramName: T;
  pushPath: (id: string) => string;
}) {
  const router = useRouter();
  const { splitMode, paramName, pushPath } = options;

  const openDetail = useCallback(
    (id: string) => {
      if (splitMode) {
        router.setParams({ [paramName]: id } as Record<string, string>);
      } else {
        router.push(pushPath(id) as Href);
      }
    },
    [paramName, pushPath, router, splitMode]
  );

  return { openDetail };
}
