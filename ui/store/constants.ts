import type { CoordinatesState, InputsState } from './types';

export const INPUT_DEFAULT_VALUES: InputsState = {
  hue: 0,
  curveType: '',
  curveSubType: '',
  swatchName: '',
  autoGenerateSwatchName: true,
  stepCount: 7,
  freeHandMode: true,
};

export const COORDINATES_DEFAULT_VALUES: CoordinatesState = {
  startPoint: {
    x: 95,
    y: 95,
  },
  endPoint: {
    x: 360,
    y: 360,
  },
  startPointHandle: {
    x: 360,
    y: 95,
  },
  endPointHandle: {
    x: 360,
    y: 95,
  },
};
