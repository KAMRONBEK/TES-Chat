import { type ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center',
  },
});

/**
 * Wraps `node` in a `Pressable` when `onPress` is defined; otherwise returns `node`.
 * Empty slots stay unwrapped so non-interactive content is not exposed as a button.
 */
export function wrapOptionalPressable(
  node: ReactNode | undefined,
  onPress: (() => void) | undefined,
): ReactNode {
  if (node == null || node === false) {
    return node ?? null;
  }
  if (onPress == null) {
    return node;
  }
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={10}
      onPress={onPress}
      style={styles.pressable}
    >
      {node}
    </Pressable>
  );
}
