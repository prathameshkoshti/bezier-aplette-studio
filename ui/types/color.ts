import type { RGB } from 'color-convert/conversions';

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type ContrastInfo = {
  ratio: number;
  score: string;
};

export type HueValue = Range<0, 361>;

type ColorData = {
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
