import type { Point } from '@appTypes/coords';
import type { HueValue } from '@appTypes/color';
import type { CurveType, CurveSubType } from '@appTypes/curves';

export type InputsState = {
  stepCount: number;
  hue: HueValue;
  curveType: CurveType;
  curveSubType: CurveSubType;
  freeHand: boolean;
};

export type CoordinatesState = {
  startPoint: Point;
  endPoint: Point;
  startPointHandle: Point;
  endPointHandle: Point;
};

export type InputsAction = {
  updateHue: (hue: InputsState['hue']) => void;
  updateStepCount: (hue: InputsState['stepCount']) => void;
  updateCurveType: (hue: InputsState['curveType']) => void;
  updateCurveSubType: (hue: InputsState['curveSubType']) => void;
  updateFreeHand: (freeHand: InputsState['freeHand']) => void;
};

export type CoordinatesAction = {
  updateStartPoint: (startPoint: CoordinatesState['startPoint']) => void;
  updateEndPoint: (endPoint: CoordinatesState['endPoint']) => void;
  updateStartPointHandle: (
    startPointHandle: CoordinatesState['startPointHandle'],
  ) => void;
  updateEndPointHandle: (
    endPointHandle: CoordinatesState['endPointHandle'],
  ) => void;
};

export type SetFunction = (
  partialState: Partial<InputsState & CoordinatesState>,
) => void;
