export type Point = {
  x: number;
  y: number;
};

export type CoordType =
  | 'startPoint'
  | 'endPoint'
  | 'startPointHandle'
  | 'endPointHandle'
  | 'colorPoint';

export type EditableCoordsType = Exclude<CoordType, 'colorPoint'>;
