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

type Point = {
  x: number;
  y: number;
};

type CoordinatesState = {
  startPoint: Point;
  endPoint: Point;
  startPointHandle: Point;
  endPointHandle: Point;
};

export type Swatch = CoordinatesState & {
  id: string;
  name: string;
  stepCount: number;
  hue: Range<0, 361>;
};
