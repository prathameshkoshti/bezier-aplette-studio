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

export type HueValue = Range<0, 361>;

export type ColorData = {
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
