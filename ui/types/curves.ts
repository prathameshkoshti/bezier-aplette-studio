import { curvesTypes, curveSubTypes } from '@constants/curves';

export type CurveType = keyof typeof curvesTypes;

export type CurveSubType = keyof typeof curveSubTypes;
