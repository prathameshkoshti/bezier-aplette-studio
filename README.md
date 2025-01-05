# Bézier Palette Studio - Figma Plugin

This plugin can help you create a color palette using the bézier curve handler on the HSV color picker.

## How to use this plugin:

![Image 1](https://github.com/user-attachments/assets/d0e68fa6-7cfd-4f9f-ab47-13b179a5f8e0)
### As shown in the above image, the UI will have the following input components:
- **HSV Color picker with bézier curve editor:** this will have two color points (start and end points) and two handler points from which a bézier curve will be drawn.
- **Name:** to name the swatch (can be auto-generated.)
- **Step counter:** The number of colors to have on a swatch.
- **Free-hand mode toggle:** To toggle free-hand mode (by default, it's on), if off, the user can select from the curve presets listed in the curve selection dropdowns. In this mode, handlers will be disabled.
- **Curve dropdown:** This will have preset options, such as linear, sine, quad, and many more, which can be applied to the curve.
- **Curve transition dropdown:** this selection will have options for curve transition types such as ease-in, ease-out, and ease-in-out (for the linear option, this will be disabled.)
- **Generate swatch button:** to generate the swatch.

![Image 2](https://github.com/user-attachments/assets/5153c2b7-8a52-4257-9461-dad018ea1c81)
### On generating the swatch, the right side will have the following UI elements:
- **Accordions of swatches:** accordions of swatches will appear as you generate multiple swatches. The swatches can be edited, duplicated, and deleted.
- **Color info:** each swatch will have a list of colors, along with the color's number, hex code, token, and contrast ratio information.

### On finalizing the palette, you can do the following operations:
- **Generate styles:** for the generated palette, this will create styles in the current Figma file.
- **Export palette:** for the generated palette, this will export the frames in the current page of the Figma file.
- **Tokens:** this will show tokens of the generated palette in JSON format.

## To set up the project, follow the following instructions:

- Clone the repository
- Run the following command to install packages:
  ```
  npm install
  ```
- To run the project locally in the browser, you can run the following command:
  ```
  npm run dev
  ```
  Note: This will only run the project locally in the browser, not in the Figma app.
- To run the plugin in the Figma app, run the following command:
  ```
  npm run build
  ```
  Now, go to Figma app -> Plugins Menu -> Development -> Import plugin from manifest. Locate the manifest.json file and load it in the Figma app. Once loaded

That's it! You can use the plugin locally if you wish to make any changes to the code.
