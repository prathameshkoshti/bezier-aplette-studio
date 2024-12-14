import { CurveSubType, CurveType } from '@appTypes/curves';

export type CurveTypeProps = {
  curveType: CurveType;
  curveSubType: string;
  handleCurveType: (curveType: CurveType) => void;
  handleCurveSubType: (curveSubType: CurveSubType) => void;
};
