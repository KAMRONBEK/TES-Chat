import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

/** Native: no wide-web split; values are safe defaults for shared layout math. */
export function useBreakpoint() {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const webRailWidth = 0;
    const tabContentWidth = width;
    const sidebarWidth = Math.min(420, Math.max(320, width * 0.36));
    return {
      width,
      isWeb: false,
      isWideWeb: false,
      isCompactWeb: false,
      webRailWidth,
      tabContentWidth,
      sidebarWidth,
    };
  }, [width]);
}

export { WIDE_WEB_BREAKPOINT } from './useBreakpoint.shared';
