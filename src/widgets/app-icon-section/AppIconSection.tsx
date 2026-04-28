import { useTheme } from '@shopify/restyle';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { type AppIconOptionId, appIconOptions, isAppIconOptionId } from '@/shared/config/app-icons';
import { safeAsyncStorageGetItem, safeAsyncStorageSetItem } from '@/shared/lib/safe-async-storage';
import { AppIconPickerTile } from '@/shared/ui/app-icon-picker-tile';
import { Box, Text, type Theme } from '@/shared/ui/restyle';

const STORAGE_KEY = '@TESChat/appearanceAppIconId';

export type AppIconSectionProps = {
  /**
   * Seed value before storage runs. When `hydrateFromStorage` is true, a valid saved id
   * replaces this after AsyncStorage resolves; otherwise this stays the source of truth.
   */
  initialSelection?: AppIconOptionId;
  /**
   * When true (default), load persisted id after mount and override `initialSelection`.
   * When false, skip storage reads — use for controlled previews or tests.
   */
  hydrateFromStorage?: boolean;
  onSelectionChange?: (id: AppIconOptionId) => void;
  testID?: string;
};

/**
 * App icon customization block: section title and a horizontal carousel of icon options.
 */
export function AppIconSection({
  initialSelection = 'default',
  hydrateFromStorage = true,
  onSelectionChange,
  testID,
}: AppIconSectionProps) {
  const { colors, spacing } = useTheme<Theme>();
  const [selected, setSelected] = useState<AppIconOptionId>(initialSelection);

  useEffect(() => {
    if (!hydrateFromStorage) return;
    let cancelled = false;
    void safeAsyncStorageGetItem(STORAGE_KEY).then((raw) => {
      if (cancelled || raw == null) return;
      if (isAppIconOptionId(raw)) {
        setSelected(raw);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [hydrateFromStorage]);

  useEffect(() => {
    if (hydrateFromStorage) return;
    setSelected(initialSelection);
  }, [hydrateFromStorage, initialSelection]);

  const onPick = useCallback(
    (id: AppIconOptionId) => {
      setSelected(id);
      onSelectionChange?.(id);
      void safeAsyncStorageSetItem(STORAGE_KEY, id);
    },
    [onSelectionChange]
  );

  return (
    <Box testID={testID}>
      <Box paddingHorizontal="md" paddingTop="md" paddingBottom="sm">
        <Text
          fontSize={13}
          fontWeight="600"
          letterSpacing={0.6}
          textTransform="uppercase"
          color="textSecondary"
        >
          App icon
        </Text>
      </Box>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: colors.appIconSectionStripBg }}
        contentContainerStyle={{
          flexDirection: 'row',
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.lg,
          columnGap: spacing.lg,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {appIconOptions.map(({ id, label, image }) => (
          <AppIconPickerTile
            key={id}
            label={label}
            source={image}
            selected={selected === id}
            onPress={() => onPick(id)}
            testID={testID ? `${testID}-tile-${id}` : undefined}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
