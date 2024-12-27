/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
