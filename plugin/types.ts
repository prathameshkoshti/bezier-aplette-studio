type ColorData = {
  hex: string;
  rgb: RGB;
  colorCodeName: string;
};

export type SwatchData = {
  id: string;
  name: string;
  swatchCodeName: string;
  colors: ColorData[];
};
