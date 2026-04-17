import { StatusBar, StatusBarStyle } from 'expo-status-bar';

import { useColorScheme } from '@/shared/lib/hooks';

type Props = {
  /** Force a specific style regardless of the current color scheme. */
  overrideStyle?: StatusBarStyle;
};

/**
 * Automatically picks the correct status-bar text colour for the current
 * colour scheme: light text on dark backgrounds, dark text on light ones.
 *
 * Pass `overrideStyle` when the screen has a fixed dark/light header
 * regardless of system appearance (e.g. a dark-only chat header).
 */
export const CustomStatusBar = ({ overrideStyle }: Props) => {
  const scheme = useColorScheme();
  const style = overrideStyle ?? (scheme === 'dark' ? 'light' : 'dark');

  return <StatusBar style={style} />;
};
