# figma-plugin-color-swatch-generator

This plugin can help you create a color palette using the bézier curve handler on the HSV color picker.

## How to use this plugin:

![Image 1](https://github.com/user-attachments/assets/4c51b16b-e792-42e5-b443-24a6f43c2d4d)
### As shown in the above image, the UI will have the following input components:
- **Cubic bézier curve color picker:** this will have two color points (start and end point) and two handler points from which a bézier curve will be drawn.
- **Name:** to name the swatch (can be auto-generated.)
- **Step counter:** The number of colors to have on a swatch.
- **Free-hand mode toggle:** To toggle free-hand mode (by default, it's on), if off, the user can select from the curve presets listed in the curve selection dropdowns. In this mode, handlers will be disabled.
- **Curve dropdown:** This will have preset options, such as linear, sine, quad, and many more, which can be applied to the curve.
- **Curve transition dropdown:** this selection will have options for curve transition type such as ease-in, ease-out, and ease-in-out, (for the linear option this will be disabled.)
- **Generate swatch button:** to generate the swatch.

![Image 2](https://github.com/user-attachments/assets/99b6481f-4ff7-41fd-9bd9-f0a20b1f93ab)
### On generating the swatch right side will have the following UI elements:
- **Accordions of swatches:** accordions of swatches will appear as you generate the swatches, the swatches can be edited, duplicated, and deleted.
- **Color info:** each swatch will have a list of colors, along with the color's number, hex code, token, and contrast ratio information.

### On finalizing the palette, you can do the following operations:
- **Generate styles:** for the generated palette, this will create styles in the current Figma file.
- **Export palette:** for the generated palette, this will export the frames in the current page of the Figma file.
- **Tokens:** this will show tokens of the generated palette in JSON format.

## To set up the project follow the following instructions:

- Fork the repository
- Run the following command to install packages:
  ```
  npm install
  ```
- To run the project locally in the browse, you can run the following command:
  ```
  npm run dev
  ```
  Note: This will only run the project locally in the browser, not in the Figma app.
- To run the plugin in the Figma app, run the following command:
  ```
  npm run build
  ```
  Now, go to Figma app -> Plugins Menu -> Development -> Import plugin from manifest... and locate the manifest.json file and load it in the Figma app. Once loaded
  
That's it! You can use the plugin locally if you wish to make any changes to the code.
