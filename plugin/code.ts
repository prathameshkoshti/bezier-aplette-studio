/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { SwatchData } from './types';
import {
  BORDER_RADIUS,
  SWATCH_COLLECTION_ITEMS_SPACING,
  SWATCH_COLLECTION_PADDING,
  SWATCH_ITEMS_SPACING,
  SWATCH_PADDING,
} from './constants';
import {
  createAutoLayout,
  createColorNode,
  createTextNode,
  getFillColor,
  preloadFonts,
} from './utils';

// Load commonly used fonts when plugin starts
(async () => {
  await preloadFonts();
})();

const createStyles = (swatches: SwatchData[]) => {
  (async () => {
    try {
      const styles = await figma.getLocalPaintStylesAsync();
      styles.forEach((style) => {
        style.remove();
      });
      for (const swatch of swatches) {
        const groupName = swatch.name;
        for (const color of swatch.colors) {
          const styleName = `${groupName}/${color.name}`;
          const [r, g, b] = color.rgb as unknown as number[];
          const style = figma.createPaintStyle();
          style.name = styleName;
          style.paints = getFillColor(r, g, b);
        }
      }
      if (swatches.length) {
        figma.notify('Styles Created! 🎉');
      }
    } catch (error) {
      console.error('Error in exporting styles:', error);
      figma.notify('Error occurred while exporting files!', { error: true });
    }
  })();
};

const createPalette = (swatches: SwatchData[]) => {
  try {
    const swatchCollection = createAutoLayout(
      SWATCH_COLLECTION_PADDING,
      SWATCH_COLLECTION_ITEMS_SPACING,
      'HORIZONTAL',
    );
    swatchCollection.fills = [figma.util.solidPaint('#00000000')];
    swatchCollection.name = 'Swatch Collection';
    swatchCollection.layoutWrap = 'WRAP';
    swatchCollection.maxWidth = 2600;
    for (const swatch of swatches) {
      // create frame
      const frame = createAutoLayout(
        SWATCH_PADDING,
        SWATCH_ITEMS_SPACING,
        'VERTICAL',
      );
      figma.currentPage.appendChild(frame);
      frame.cornerRadius = BORDER_RADIUS;

      // create frame header
      const headerText = createTextNode(swatch.name, 24);

      // create swatch group frame
      const swatchFrameGroup = createAutoLayout(0, 0, 'VERTICAL');
      swatchFrameGroup.name = `${swatch.name} Swatch`;
      swatchFrameGroup.cornerRadius = BORDER_RADIUS;

      for (const color of swatch.colors) {
        const rect = createColorNode(color, swatch.token);
        swatchFrameGroup.appendChild(rect);
      }
      frame.name = swatch.name;
      frame.appendChild(headerText);
      frame.appendChild(swatchFrameGroup);
      swatchCollection.appendChild(frame);
    }
    if (swatches.length) {
      figma.notify('Palette Exported! 🎉');
    }
    figma.viewport.scrollAndZoomIntoView([swatchCollection]);
  } catch (error) {
    console.error('Error while creating palette:', error);
    figma.notify('Error occurred while creating palette!', { error: true });
  }
};

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  height: 768,
  width: 991,
  themeColors: true,
});

figma.ui.onmessage = (msg: { type: string; colors: SwatchData[] }) => {
  switch (msg.type) {
    case 'create-color-styles': {
      createStyles(msg.colors);
      break;
    }
    case 'export-color-palette': {
      createPalette(msg.colors);
      break;
    }
    default: {
      break;
    }
  }
};
