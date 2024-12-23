import camelCase from 'camelcase';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { Bezier } from 'bezier-js';
import { twMerge } from 'tailwind-merge';
import convertColor from 'color-convert';
import type { HueValue } from '@appTypes/color';
import type { Point } from '@appTypes/coords';
import type { Swatch } from '@store/types';
import {
  MAX_BOUNDARY,
  MIN_BOUNDARY,
} from '@components/BezierCurveGraph/constants';

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

export const getSwatchData = (swatches: Swatch[]) => {
  const swatchData: Record<string, Record<string, string>> = {};

  for (const swatch of swatches) {
    const {
      hue,
      name,
      startPoint,
      endPoint,
      startPointHandle,
      endPointHandle,
      stepCount,
    } = swatch;

    const { x: x1, y: y1 } = startPoint;
    const { x: x2, y: y2 } = endPoint;
    const { x: cx1, y: cy1 } = startPointHandle;
    const { x: cx2, y: cy2 } = endPointHandle;

    const swatchName = camelCase(name);

    const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
    const colorsCords = curve.getLUT(stepCount - 1);

    const colors = colorsCords.map((colorCord) => {
      const { x, y } = colorCord;
      return getColorForCoordinates(hue, { x, y }, MIN_BOUNDARY, MAX_BOUNDARY);
    });

    swatchData[swatchName] = colors.reduce(
      (acc, color, index) => {
        acc[(index + 1) * 100] = color;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  return swatchData;
};

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
  if (hue >= 245 && hue < 270) return 'Indigo';
  if (hue >= 270 && hue < 285) return 'Purple';
  if (hue >= 285 && hue < 315) return 'Magenta';
  if (hue >= 315 && hue < 345) return 'Pink';

  return 'Unknown';
};
