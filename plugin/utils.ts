/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import type { ColorData, ContrastInfo } from './types';
import {
  BLACK_COLOR,
  COLOR_RECT_HEIGHT,
  COLOR_RECT_PADDING,
  COLOR_RECT_WIDTH,
  DARK_BORDER,
  INTER_REGULAR_FONT,
  LIGHT_BORDER,
  NOTO_SANS_MONO_REGULAR_FONT,
  NOTO_SANS_REGULAR_FONT,
  PILL_FONT_SIZE,
  PILL_ITEM_SPACING,
  PILL_PADDING,
  WHITE_COLOR,
  CONTRAST_PILL_ITEM_SPACING,
  PILL_BORDER_RADIUS,
  DEFAULT_FONT_SIZE,
  COLOR_INFO_ITEM_SPACING,
  COLOR_INFO_PADDING,
} from './constants';

export async function preloadFonts() {
  try {
    await Promise.all([
      figma.loadFontAsync(INTER_REGULAR_FONT),
      figma.loadFontAsync(NOTO_SANS_REGULAR_FONT),
      figma.loadFontAsync(NOTO_SANS_MONO_REGULAR_FONT),
    ]);
  } catch (error) {
    console.error('Font loading failed:', error);
    figma.notify('Error occurred while loading fonts!', { error: true });
  }
}

const capitalizeFirstLetter = (val: string) =>
  String(val).charAt(0).toUpperCase() + String(val).slice(1);

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
export const createTextNode = (
  text: string,
  fontSize: number,
  color = BLACK_COLOR,
  isMono = false,
) => {
  const textNode = figma.createText();
  textNode.characters = text;
  textNode.fontSize = fontSize;
  textNode.fills = [figma.util.solidPaint(color)];
  textNode.fontName = isMono
    ? NOTO_SANS_MONO_REGULAR_FONT
    : NOTO_SANS_REGULAR_FONT;

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
  const tokenNode = createAutoLayout(
    PILL_PADDING as [number, number, number, number],
    PILL_ITEM_SPACING,
    'HORIZONTAL',
  );
  const tokenTextNode = createTextNode(text, PILL_FONT_SIZE, undefined, true);

  tokenNode.fills = [figma.util.solidPaint(WHITE_COLOR)];
  tokenNode.strokes = [figma.util.solidPaint(LIGHT_BORDER)];

  tokenNode.cornerRadius = PILL_BORDER_RADIUS;
  tokenNode.appendChild(tokenTextNode);
  tokenNode.name = 'Token';
  return tokenNode;
};

export const getContrastNode = (
  forColor: 'white' | 'black',
  contrast: ContrastInfo,
) => {
  const contrastNode = createAutoLayout(
    PILL_PADDING as [number, number, number, number],
    CONTRAST_PILL_ITEM_SPACING,
    'HORIZONTAL',
  );
  const { ratio, score } = contrast;

  const textColor = forColor === 'black' ? WHITE_COLOR : BLACK_COLOR;
  const backgroundColor = forColor === 'black' ? BLACK_COLOR : WHITE_COLOR;
  const borderColor = forColor === 'black' ? DARK_BORDER : LIGHT_BORDER;

  const contrastRatio = createTextNode(
    String(ratio.toFixed(2)),
    PILL_FONT_SIZE,
    textColor,
  );
  const contrastScore = createTextNode(score, PILL_FONT_SIZE, textColor);
  contrastNode.appendChild(contrastRatio);
  contrastNode.appendChild(contrastScore);

  contrastNode.cornerRadius = PILL_BORDER_RADIUS;
  contrastNode.name = `${capitalizeFirstLetter(forColor)} Contrast`;
  contrastNode.fills = [figma.util.solidPaint(backgroundColor)];
  contrastNode.strokes = [figma.util.solidPaint(borderColor)];

  return contrastNode;
};

export const createColorNode = (color: ColorData, swatchToken: string) => {
  const colorInfo = createAutoLayout(
    COLOR_RECT_PADDING,
    DEFAULT_FONT_SIZE,
    'VERTICAL',
  );
  const colorPrimaryInfo = createAutoLayout(
    COLOR_INFO_PADDING,
    COLOR_INFO_ITEM_SPACING,
    'HORIZONTAL',
  );
  const colorSecondaryInfo = createAutoLayout(
    COLOR_INFO_PADDING,
    COLOR_INFO_ITEM_SPACING,
    'HORIZONTAL',
  );

  const textColor =
    color.contrast.white.ratio > color.contrast.black.ratio
      ? WHITE_COLOR
      : BLACK_COLOR;

  // primary info
  const colorName = createTextNode(
    color.name,
    DEFAULT_FONT_SIZE,
    textColor,
    true,
  );
  const colorHex = createTextNode(
    color.hex,
    DEFAULT_FONT_SIZE,
    textColor,
    true,
  );
  const tokenNode = getColorTokenNode(`${swatchToken}.${color.name}`);
  colorPrimaryInfo.appendChild(colorName);
  colorPrimaryInfo.appendChild(colorHex);
  colorPrimaryInfo.name = 'Primary Info';
  colorPrimaryInfo.fills = [figma.util.solidPaint(color.hex)];
  colorPrimaryInfo.appendChild(tokenNode);
  colorPrimaryInfo.counterAxisAlignItems = 'CENTER';

  // absolute position token node
  const inlinePadding = COLOR_RECT_PADDING * 2;
  colorPrimaryInfo.minWidth = COLOR_RECT_WIDTH - inlinePadding;
  tokenNode.layoutPositioning = 'ABSOLUTE';
  tokenNode.x = COLOR_RECT_WIDTH - inlinePadding - tokenNode.width;
  tokenNode.constraints = { horizontal: 'MAX', vertical: 'MIN' };

  // contrast info
  const whiteContrastNode = getContrastNode('white', color.contrast.white);
  const blackContrastNode = getContrastNode('black', color.contrast.black);
  colorSecondaryInfo.appendChild(whiteContrastNode);
  colorSecondaryInfo.appendChild(blackContrastNode);

  colorSecondaryInfo.name = 'Secondary Info';
  colorSecondaryInfo.fills = [figma.util.solidPaint(color.hex)];

  colorInfo.name = color.token;
  colorInfo.appendChild(colorPrimaryInfo);
  colorInfo.appendChild(colorSecondaryInfo);

  colorInfo.resize(COLOR_RECT_WIDTH, COLOR_RECT_HEIGHT);
  colorInfo.fills = [figma.util.solidPaint(color.hex)];

  return colorInfo;
};
