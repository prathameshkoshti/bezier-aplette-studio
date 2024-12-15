import type { HueValue } from '@appTypes/color';
import type { CoordType, EditableCoordsType, Point } from '@appTypes/coords';

export type Coords = {
  x: number;
  y: number;
};

export type PointProps = {
  hue?: HueValue;
  x: number;
  y: number;
  type: CoordType;
  handlePointCoords?: (coords: Point, type: EditableCoordsType) => void;
  maxBoundary?: Coords;
  minBoundary?: Coords;
  parentCoords?: Coords;
  disabled?: boolean;
};
