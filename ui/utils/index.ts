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

export const uuid = () => Date.now().toString(36);

export const getNameFromHue = (hue: HueValue) => {
  if (hue < 0 || hue > 360) {
    return 'Invalid hue value. Hue should be between 0 and 360.';
  }

  if ((hue >= 0 && hue < 15) || (hue >= 345 && hue <= 360)) return 'Red';
  if (hue >= 15 && hue < 45) return 'Orange';
  if (hue >= 45 && hue < 75) return 'Yellow';
  if (hue >= 75 && hue < 100) return 'Lime';
  if (hue >= 75 && hue < 160) return 'Green';
  if (hue >= 160 && hue < 175) return 'Teal';
  if (hue >= 175 && hue < 205) return 'Cyan';
  if (hue >= 205 && hue < 245) return 'Blue';
  if (hue >= 245 && hue < 260) return 'Indigo';
  if (hue >= 260 && hue < 275) return 'Purple';
  if (hue >= 275 && hue < 315) return 'Magenta';
  if (hue >= 315 && hue < 345) return 'Pink';

  return 'Unknown';
};
