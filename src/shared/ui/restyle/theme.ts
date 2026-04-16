import { createTheme } from '@shopify/restyle';

import { appTheme } from '@/shared/config/theme';

function palette(p: (typeof appTheme)['light'] | (typeof appTheme)['dark']): Record<string, string> {
  return { ...p };
}

const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
} as const;

const borderRadii = {
  none: 0,
  sm: 8,
  md: 10,
  lg: 12,
  full: 9999,
} as const;

export const lightTheme = createTheme({
  colors: palette(appTheme.light),
  spacing,
  borderRadii,
  textVariants: {
    defaults: {
      color: 'textPrimary',
      fontSize: 16,
    },
    navTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: 'navBarText',
      textAlign: 'center',
      width: '100%',
    },
    navSideLabel: {
      fontSize: 17,
    },
    searchIdleLabel: {
      fontSize: 16,
      flexShrink: 1,
    },
  },
});

export const darkTheme: typeof lightTheme = {
  ...lightTheme,
  colors: palette(appTheme.dark),
};

export type Theme = typeof lightTheme;
