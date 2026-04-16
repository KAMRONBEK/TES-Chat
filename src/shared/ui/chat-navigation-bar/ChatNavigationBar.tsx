import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@shopify/restyle';
import { type ComponentProps, type ReactNode } from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { wrapOptionalPressable } from '@/shared/lib/ui';
import { Box, Text, type Theme } from '@/shared/ui/restyle';
import { SearchInput } from '@/shared/ui/search-input';

export type IoniconsName = ComponentProps<typeof Ionicons>['name'];

export type ChatNavigationBarSearchConfig = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  /** Passed through to `SearchInput` (e.g. web). */
  inputPaddingVertical?: number;
};

export type ChatNavigationBarProps = {
  title?: ReactNode;
  leftText?: string;
  leftTextColor?: string;
  rightIcon?: IoniconsName;
  rightIconColor?: string;
  rightIconSize?: number;
  leftItem?: ReactNode;
  rightItem?: ReactNode;
  search?: ChatNavigationBarSearchConfig;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  backgroundColor?: keyof Theme['colors'];
  titleColor?: string;
  style?: StyleProp<ViewStyle>;
};

function renderTitle(title: ReactNode | undefined, color: string) {
  if (title == null || title === false) {
    return null;
  }
  if (typeof title === 'string' || typeof title === 'number') {
    return (
      <Text variant="navTitle" style={[styles.titleWidth, { color }]} numberOfLines={1}>
        {title}
      </Text>
    );
  }
  return title;
}

const DEFAULT_RIGHT_ICON_SIZE = 26;

export function ChatNavigationBar({
  title,
  leftText,
  leftTextColor: leftTextColorProp,
  rightIcon,
  rightIconColor: rightIconColorProp,
  rightIconSize = DEFAULT_RIGHT_ICON_SIZE,
  leftItem,
  rightItem,
  search,
  onLeftPress,
  onRightPress,
  backgroundColor: backgroundColorKey = 'navBar',
  titleColor: titleColorProp,
  style,
}: ChatNavigationBarProps) {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const titleColor = titleColorProp ?? theme.colors.navBarText;
  const leftTextColor = leftTextColorProp ?? theme.colors.navBarSideItem;
  const rightIconColor = rightIconColorProp ?? theme.colors.navBarSideItem;

  const leftResolved =
    leftItem ??
    (leftText != null ? (
      <Text variant="navSideLabel" style={{ color: leftTextColor }} numberOfLines={1}>
        {leftText}
      </Text>
    ) : undefined);

  const rightResolved =
    rightItem ??
    (rightIcon != null ? (
      <Ionicons name={rightIcon} size={rightIconSize} color={rightIconColor} />
    ) : undefined);

  return (
    <Box
      backgroundColor={backgroundColorKey}
      style={[{ paddingTop: insets.top }, style]}>
      <Box flexDirection="row" alignItems="center" paddingHorizontal="xs" style={{ minHeight: 44 }}>
        <Box justifyContent="center" paddingHorizontal="sm" style={{ width: 72 }}>
          {wrapOptionalPressable(leftResolved, onLeftPress)}
        </Box>
        <Box flex={1} alignItems="center" justifyContent="center" style={{ minWidth: 0 }}>
          {renderTitle(title, titleColor)}
        </Box>
        <Box
          justifyContent="center"
          paddingHorizontal="sm"
          alignItems="flex-end"
          style={{ width: 72 }}>
          {wrapOptionalPressable(rightResolved, onRightPress)}
        </Box>
      </Box>
      {search != null ? (
        <Box marginHorizontal="md" style={{ marginTop: 4, marginBottom: 10 }}>
          <SearchInput
            containerStyle={styles.searchInputEmbed}
            inputPaddingVertical={search.inputPaddingVertical}
            placeholder={search.placeholder}
            value={search.value}
            onChangeText={search.onChangeText}
            onSubmit={search.onSubmit}
          />
        </Box>
      ) : null}
    </Box>
  );
}

const styles = StyleSheet.create({
  titleWidth: {
    width: '100%',
  },
  searchInputEmbed: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
});
