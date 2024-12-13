import { CurveTypes } from '@appTypes/curves';

export type CurveTypeProps = {
  curveType: CurveTypes;
  curveSubType: string;
  handleCurveType: (curveType: CurveTypes) => void;
  handleCurveSubType: (curveSubType: string) => void;
};
