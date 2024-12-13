import type { HueValue } from '@appTypes/color';
import type { CoordType, Point } from '@appTypes/coords';

export type BezierCurveGraphProps = {
  hue: HueValue;
  startPoint: Point;
  endPoint: Point;
  startPointHandle: Point;
  endPointHandle: Point;
  handlePointCoords: (coords: Point, type: CoordType) => void;
};
