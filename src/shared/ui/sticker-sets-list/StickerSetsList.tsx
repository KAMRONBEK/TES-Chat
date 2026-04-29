import { useCallback } from 'react';
import { FlatList, type ListRenderItemInfo, Platform } from 'react-native';

import { Box, Text, type Theme } from '@/shared/ui/restyle';
import { StickerSetRow } from '@/shared/ui/sticker-set-row';

export type StickerSetsListItem = {
  id: string;
  title: string;
  imageUri?: string | null;
  /** For thumbnail fallback initial */
  name?: string;
  stickerCount?: number;
  /** Overrides auto “n sticker(s)” from `stickerCount` */
  subtitle?: string;
};

export type StickerSetsListProps = {
  data: StickerSetsListItem[];
  /** Uppercase caption above the list. Pass `''` to omit. */
  sectionTitle?: string;
  onItemPress?: (item: StickerSetsListItem) => void;
  marginHorizontal?: keyof Theme['spacing'];
  marginTop?: keyof Theme['spacing'];
  marginBottom?: keyof Theme['spacing'];
  testID?: string;
  /**
   * When `false` (default), the list sizes to its content — use inside a parent `ScrollView`.
   * When `true`, the list scrolls on its own (e.g. full-screen sticker packs).
   */
  listScrollEnabled?: boolean;
};

const DEFAULT_SECTION_TITLE = 'Sticker sets';

/**
 * Section block: “STICKER SETS” header on the screen tone, then stacked {@link StickerSetRow} rows.
 */
export function StickerSetsList({
  data,
  sectionTitle = DEFAULT_SECTION_TITLE,
  onItemPress,
  marginHorizontal = 'none',
  marginTop = 'none',
  marginBottom = 'none',
  testID,
  listScrollEnabled = false,
}: StickerSetsListProps) {
  const showHeading = sectionTitle != null && sectionTitle !== '';

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<StickerSetsListItem>) => (
      <StickerSetRow
        title={item.title}
        imageUri={item.imageUri}
        name={item.name}
        stickerCount={item.stickerCount}
        subtitle={item.subtitle}
        showDivider={index < data.length - 1}
        onPress={onItemPress != null ? () => onItemPress(item) : undefined}
        testID={testID != null ? `${testID}-row-${item.id}` : undefined}
      />
    ),
    [data.length, onItemPress, testID]
  );

  const keyExtractor = useCallback((item: StickerSetsListItem) => item.id, []);

  return (
    <Box
      marginHorizontal={marginHorizontal}
      marginTop={marginTop}
      marginBottom={marginBottom}
      testID={testID}
      alignSelf="stretch"
    >
      {showHeading ? (
        <Box paddingHorizontal="lg" paddingTop="md" paddingBottom="sm" backgroundColor="chatListScreenBg">
          <Text variant="stickerSetSectionHeading">{sectionTitle}</Text>
        </Box>
      ) : null}
      <Box width="100%" overflow="hidden" backgroundColor="stickerSetRowBg">
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          scrollEnabled={listScrollEnabled}
          style={listScrollEnabled ? undefined : { flexGrow: 0 }}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={Platform.OS === 'android'}
        />
      </Box>
    </Box>
  );
}
