import type { ImageSourcePropType } from 'react-native';

import classicPng from '@/assets/appIcons/classic.png';
import classicXPng from '@/assets/appIcons/classicX.png';
import defaultPng from '@/assets/appIcons/default.png';
import defaultXPng from '@/assets/appIcons/defaultX.png';

export type AppIconOptionId = 'default' | 'defaultX' | 'classic' | 'classicX';

export const appIconOptions: readonly {
  readonly id: AppIconOptionId;
  readonly label: string;
  readonly image: ImageSourcePropType;
}[] = [
  { id: 'default', label: 'Default', image: defaultPng },
  { id: 'defaultX', label: 'Default X', image: defaultXPng },
  { id: 'classic', label: 'Classic', image: classicPng },
  { id: 'classicX', label: 'Classic X', image: classicXPng },
] as const;

export function isAppIconOptionId(value: string): value is AppIconOptionId {
  return appIconOptions.some((o) => o.id === value);
}
