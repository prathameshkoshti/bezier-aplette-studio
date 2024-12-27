/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { ColorData } from './types';
import { COLOR_RECT_HEIGHT, COLOR_RECT_WIDTH } from './constants';

export async function preloadFonts() {
  try {
    await Promise.all([
      figma.loadFontAsync({ family: 'Noto Sans', style: 'Regular' }),
      figma.loadFontAsync({ family: 'Noto Sans Mono', style: 'Regular' }),
    ]);
  } catch (error) {
    console.error('Font loading failed:', error);
    figma.notify('Error occurred while loading fonts!', { error: true });
  }
}

const convertToRGBRatio = (number: number) => number / 255;

export const getFillColor = (r: number, g: number, b: number) => [
  {
    type: 'SOLID' as const,
    color: {
      r: convertToRGBRatio(r),
      g: convertToRGBRatio(g),
      b: convertToRGBRatio(b),
    },
  },
];
export const createTextNode = (text: string, fontSize: number) => {
  const textNode = figma.createText();
  textNode.characters = text;
  textNode.fontSize = fontSize;

  return textNode;
};

export const createAutoLayout = (
  padding: number | [number, number, number, number],
  itemSpacing: number,
  layoutMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL',
) => {
  const frame = figma.createFrame();
  frame.layoutMode = layoutMode;

  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  if (typeof padding === 'number') {
    frame.paddingTop = padding;
    frame.paddingRight = padding;
    frame.paddingBottom = padding;
    frame.paddingLeft = padding;
  } else {
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    frame.paddingTop = paddingTop;
    frame.paddingRight = paddingRight;
    frame.paddingBottom = paddingBottom;
    frame.paddingLeft = paddingLeft;
  }
  frame.itemSpacing = itemSpacing;

  return frame;
};

export const getColorTokenNode = (text: string) => {
  const tokenNode = createAutoLayout([3, 5, 3, 5], 0, 'HORIZONTAL');
  const tokenTextNode = createTextNode(text, 8);

  tokenNode.fills = [figma.util.solidPaint('#ffffffCC')];

  tokenNode.cornerRadius = 10;
  tokenNode.appendChild(tokenTextNode);
  return tokenNode;
};

export const createColorNode = (color: ColorData, swatchToken: string) => {
  const colorInfo = createAutoLayout(20, 10, 'VERTICAL');
  const colorPrimaryInfo = createAutoLayout(0, 10, 'HORIZONTAL');
  const colorSecondaryInfo = createAutoLayout(0, 10, 'HORIZONTAL');

  // primary info
  const colorName = createTextNode(color.name, 12);
  const colorHex = createTextNode(color.hex, 12);
  const tokenNode = getColorTokenNode(`${swatchToken}.${color.name}`);
  colorPrimaryInfo.appendChild(colorName);
  colorPrimaryInfo.appendChild(colorHex);
  colorPrimaryInfo.name = 'Primary Info';
  colorPrimaryInfo.fills = [figma.util.solidPaint(color.hex)];
  colorPrimaryInfo.appendChild(tokenNode);
  colorPrimaryInfo.counterAxisAlignItems = 'CENTER';

  // contrast info
  colorSecondaryInfo.name = 'Secondary Info';
  colorSecondaryInfo.fills = [figma.util.solidPaint(color.hex)];

  colorInfo.name = color.token;
  colorInfo.appendChild(colorPrimaryInfo);
  colorInfo.appendChild(colorSecondaryInfo);

  colorInfo.resize(COLOR_RECT_WIDTH, COLOR_RECT_HEIGHT);
  colorInfo.fills = [figma.util.solidPaint(color.hex)];

  return colorInfo;
};
