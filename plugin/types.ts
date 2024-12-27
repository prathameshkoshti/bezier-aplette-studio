export type ColorData = {
  hex: string;
  rgb: RGB;
  token: string;
  name: string;
};

export type SwatchData = {
  id: string;
  name: string;
  token: string;
  colors: ColorData[];
};
