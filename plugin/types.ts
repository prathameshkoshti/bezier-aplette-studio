export type ContrastInfo = {
  ratio: number;
  score: string;
};

export type ColorData = {
  hex: string;
  rgb: RGB;
  token: string;
  name: string;
  contrast: {
    white: ContrastInfo;
    black: ContrastInfo;
  };
};

export type SwatchData = {
  id: string;
  name: string;
  token: string;
  colors: ColorData[];
};
