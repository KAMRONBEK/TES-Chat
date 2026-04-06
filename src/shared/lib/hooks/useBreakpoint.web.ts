import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { WIDE_WEB_BREAKPOINT } from './useBreakpoint.shared';

export function useBreakpoint() {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const isWideWeb = width >= WIDE_WEB_BREAKPOINT;
    const isCompactWeb = width < WIDE_WEB_BREAKPOINT;
    /** No left icon rail — tabs sit under the master column on split routes (see TabsBottomTabBar.web). */
    const webRailWidth = 0;
    const tabContentWidth = width;
    const sidebarWidth = isWideWeb
      ? Math.min(400, Math.max(280, tabContentWidth * 0.42))
      : Math.min(420, Math.max(320, width * 0.36));
    return {
      width,
      isWeb: true,
      isWideWeb,
      isCompactWeb,
      webRailWidth,
      tabContentWidth,
      sidebarWidth,
    };
  }, [width]);
}

export { WIDE_WEB_BREAKPOINT } from './useBreakpoint.shared';
