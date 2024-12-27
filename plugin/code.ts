/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
import type { SwatchData } from './types';

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

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
          style.paints = [
            {
              type: 'SOLID',
              color: { r: r / 255, g: g / 255, b: b / 255 },
            },
          ];
        }
      }
    } catch (error) {
      console.error('Error in creating style:', error);
    }
  })();
};

// const createPalette = async (swatches: SwatchData[]) => {
//   try {
//   } catch (error) {
//     console.error('Error in creating style:', error);
//   }
// };

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
      break;
    }
    default: {
      break;
    }
  }
  // const nodes: SceneNode[] = [];
  // const frame = figma.createFrame();
  // frame.x = 0;
  // frame.y = 0;

  // // frame.fills = [{ type: 'SOLID', color: msg.color }];
  // figma.currentPage.appendChild(frame);
  // nodes.push(frame);
  // figma.currentPage.selection = nodes;
  // figma.viewport.scrollAndZoomIntoView(nodes);
};
