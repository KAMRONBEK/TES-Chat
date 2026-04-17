const AVATAR_COLORS = [
  '#5B9BD5',
  '#70B477',
  '#9B7ED9',
  '#E67A7A',
  '#D4A35B',
  '#5C9EAD',
  '#4A90D9',
] as const;

/**
 * Deterministic color from a name string.
 * Produces a stable hash so the same name always maps to the same palette entry.
 */
export function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = name.charCodeAt(i) + ((h << 5) - h);
  }
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
