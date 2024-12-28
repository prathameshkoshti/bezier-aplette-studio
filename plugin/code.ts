/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
import type { SwatchData } from './types';
import { BORDER_RADIUS } from './constants';
import {
  createAutoLayout,
  createColorNode,
  createTextNode,
  getFillColor,
  preloadFonts,
} from './utils';

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

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
    } catch (error) {
      console.error('Error in exporting styles:', error);
      figma.notify('Error occurred while exporting files!', { error: true });
    }
  })();
};

const createPalette = (swatches: SwatchData[]) => {
  try {
    const nodes: SceneNode[] = [];

    for (const swatch of swatches) {
      // create frame
      const frame = createAutoLayout(50, 20, 'VERTICAL');
      frame.x = 0;
      frame.y = 0;
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
    }
    figma.viewport.scrollAndZoomIntoView(nodes);
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

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg: { type: string; colors: SwatchData[] }) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
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
