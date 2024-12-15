import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import convertColor from 'color-convert';
import type { HueValue } from '@appTypes/color';
import type { Point } from '@appTypes/coords';

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(s: string) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

export function getColorForCoordinates(
  hue: HueValue,
  pointCoords: Point,
  minBoundary: Point,
  maxBoundary: Point,
) {
  const { x, y } = pointCoords;
  const saturationPoint = x - minBoundary.x;
  const brightnessPoint = y - minBoundary.y;

  const colorPickerWidth = maxBoundary.x - minBoundary.x;
  const colorPickerHeight = maxBoundary.y - minBoundary.y;

  const saturation = clamp((saturationPoint / colorPickerWidth) * 100, 0, 100);
  const lightness = clamp(
    100 - (brightnessPoint / colorPickerHeight) * 100,
    0,
    100,
  );
  const newColor = convertColor.hsv.hex([hue, saturation, lightness]);
  return `#${newColor}`;
}
