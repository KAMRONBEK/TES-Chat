import { useCallback, useMemo, useState } from 'react';
import { type LayoutChangeEvent, PanResponder } from 'react-native';

import { useColorScheme } from '@/shared/lib/hooks';
import { Box, Text } from '@/shared/ui/restyle';

const STEP_COUNT = 7;
const MAX_INDEX = STEP_COUNT - 1;

/** Inclusive max level index (0-based). Use when validating persisted values. */
export const TEXT_SIZE_MAX_LEVEL_INDEX = MAX_INDEX;

/** Default level when nothing is stored yet; center of the discrete track. */
export const TEXT_SIZE_DEFAULT_LEVEL_INDEX = Math.floor(MAX_INDEX / 2);
const THUMB_SIZE = 28;
const THUMB_R = THUMB_SIZE / 2;
const TRACK_HEIGHT = 3;
const DOT_SIZE = 5;
const DOT_R = DOT_SIZE / 2;
const SMALL_A = 15;
const LARGE_A = 27;
const TRACK_SLOT_HEIGHT = 40;
const TRACK_LINE_TOP = (TRACK_SLOT_HEIGHT - TRACK_HEIGHT) / 2;
const DOT_TOP = TRACK_SLOT_HEIGHT / 2 - DOT_R;
const THUMB_TOP = TRACK_SLOT_HEIGHT / 2 - THUMB_R;

function clampIndex(n: number): number {
  return Math.max(0, Math.min(MAX_INDEX, n));
}

function xToIndex(x: number, trackWidth: number): number {
  if (trackWidth <= 0) return TEXT_SIZE_DEFAULT_LEVEL_INDEX;
  const inner = trackWidth - THUMB_SIZE;
  if (inner <= 0) return TEXT_SIZE_DEFAULT_LEVEL_INDEX;
  const t = (x - THUMB_R) / inner;
  return clampIndex(Math.round(t * MAX_INDEX));
}

export type TextSizeSliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  testID?: string;
};

/**
 * Discrete 7-step “A”–“A” text size control: two-tone track, tick marks, draggable thumb.
 */
export function TextSizeSlider({ value, onValueChange, testID }: TextSizeSliderProps) {
  const scheme = useColorScheme();
  const [trackW, setTrackW] = useState(0);

  const onTrackLayout = useCallback((e: LayoutChangeEvent) => {
    setTrackW(e.nativeEvent.layout.width);
  }, []);

  const centerX = useCallback(
    (i: number) => {
      if (trackW <= 0) return THUMB_R;
      const inner = trackW - THUMB_SIZE;
      return THUMB_R + (i / MAX_INDEX) * inner;
    },
    [trackW]
  );

  const activeEnd = centerX(value);
  const thumbLeft = centerX(value) - THUMB_R;

  const updateFromX = useCallback(
    (x: number) => {
      onValueChange(xToIndex(x, trackW));
    },
    [onValueChange, trackW]
  );

  const pan = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
          updateFromX(e.nativeEvent.locationX);
        },
        onPanResponderMove: (e) => {
          updateFromX(e.nativeEvent.locationX);
        },
        onPanResponderRelease: (e) => {
          updateFromX(e.nativeEvent.locationX);
        },
      }),
    [updateFromX]
  );

  const thumbHasOutline = scheme === 'light';

  return (
    <Box
      testID={testID}
      flexDirection="row"
      alignItems="center"
      paddingVertical="md"
      paddingHorizontal="md"
      backgroundColor="textSizeSliderRowBg"
    >
      <Text fontSize={SMALL_A} fontWeight="300" color="textSizeSliderIcon">
        A
      </Text>
      <Box
        flex={1}
        height={TRACK_SLOT_HEIGHT}
        marginHorizontal="messageListH"
        justifyContent="center"
        position="relative"
        onLayout={onTrackLayout}
        accessible
        accessibilityRole="adjustable"
        accessibilityValue={{
          min: 0,
          max: MAX_INDEX,
          now: value,
          text: `${value + 1} of ${STEP_COUNT}`,
        }}
        {...pan.panHandlers}
      >
        {trackW > 0 && (
          <>
            <Box
              pointerEvents="none"
              position="absolute"
              left={0}
              top={TRACK_LINE_TOP}
              width={trackW}
              height={TRACK_HEIGHT}
              borderRadius="textSizeSliderTrack"
              backgroundColor="textSizeSliderInactive"
            />
            <Box
              pointerEvents="none"
              position="absolute"
              left={0}
              top={TRACK_LINE_TOP}
              width={activeEnd}
              height={TRACK_HEIGHT}
              borderRadius="textSizeSliderTrack"
              backgroundColor="textSizeSliderActive"
            />
            {Array.from({ length: STEP_COUNT }, (_, i) => {
              const cx = centerX(i);
              const isActive = i <= value;
              return (
                <Box
                  key={i}
                  pointerEvents="none"
                  position="absolute"
                  left={cx - DOT_R}
                  top={DOT_TOP}
                  width={DOT_SIZE}
                  height={DOT_SIZE}
                  borderRadius="full"
                  backgroundColor={isActive ? 'textSizeSliderActive' : 'textSizeSliderInactive'}
                />
              );
            })}
            <Box
              pointerEvents="none"
              position="absolute"
              top={THUMB_TOP}
              left={thumbLeft}
              width={THUMB_SIZE}
              height={THUMB_SIZE}
              borderRadius="full"
              backgroundColor="textSizeSliderThumb"
              borderColor="textSizeSliderThumbBorder"
              borderWidth={thumbHasOutline ? 2 : 0}
            />
          </>
        )}
      </Box>
      <Text fontSize={LARGE_A} fontWeight="300" color="textSizeSliderIcon">
        A
      </Text>
    </Box>
  );
}
