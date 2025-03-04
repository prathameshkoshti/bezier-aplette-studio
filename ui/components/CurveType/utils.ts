import capitalize from 'lodash/capitalize';
import type { CurveSubType, CurveType } from '@appTypes/curves';
import type { Point } from '@appTypes/coords';
import {
  COLOR_PICKER_CONTAINER_SIZE,
  COLOR_PICKER_SIZE,
} from '@constants/colors';
import { bezierFunctions, curvesTypes } from '@constants/curves';

const colorPickerPadding =
  (COLOR_PICKER_CONTAINER_SIZE - COLOR_PICKER_SIZE) / 2;

const getCurveFunction = (
  curveType: CurveType,
  curveSubType: CurveSubType | '',
) => {
  let curve: string = curveType;
  if (curveType && curvesTypes[curveType].subTypes) {
    curve = `${curveSubType}${capitalize(curveType)}`;
  }
  return bezierFunctions[curve as keyof typeof bezierFunctions];
};

// eslint-disable-next-line import/prefer-default-export
export const getRelativePositionForHandles = (
  startPoint: Point,
  endPoint: Point,
  curveType: CurveType,
  curveSubType: CurveSubType | '',
) => {
  // calculate curve width and height
  const curveWidth = Math.abs(startPoint.x - endPoint.x);
  const curveHeight = Math.abs(startPoint.y - endPoint.y);

  // get relative position for start and end point coordinates
  const lowestX = startPoint.x < endPoint.x ? startPoint.x : endPoint.x;
  const lowestY = startPoint.y < endPoint.y ? startPoint.y : endPoint.y;
  const x1RelativePosition = lowestX - colorPickerPadding;
  const y1RelativePosition = lowestY - colorPickerPadding;

  const curveFunction = getCurveFunction(curveType, curveSubType);

  const startHandleX =
    curveWidth * curveFunction[0] + x1RelativePosition + colorPickerPadding;
  const startHandleY =
    curveHeight * curveFunction[1] + y1RelativePosition + colorPickerPadding;

  const endHandleX =
    curveWidth * curveFunction[2] + x1RelativePosition + colorPickerPadding;
  const endHandleY =
    curveHeight * curveFunction[3] + y1RelativePosition + colorPickerPadding;

  return {
    startHandleX,
    startHandleY,
    endHandleX,
    endHandleY,
  };
};
