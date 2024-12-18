import useColorPicker from '@store/colorPicker';
import { Bezier } from 'bezier-js';
import {
  MAX_BOUNDARY,
  MIN_BOUNDARY,
} from '@components/BezierCurveGraph/constants';
import Point from '../Point';

function CurvePoints() {
  const {
    hue,
    startPoint,
    endPoint,
    startPointHandle,
    endPointHandle,
    stepCount,
  } = useColorPicker();

  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  const swatches = curve.getLUT(stepCount - 1);

  swatches.shift();
  swatches.pop();

  return (
    <g>
      {swatches.map((color) => (
        <Point
          key={`${color.x},${color.y}`}
          hue={hue}
          type="colorPoint"
          x={color.x}
          y={color.y}
          minBoundary={MIN_BOUNDARY}
          maxBoundary={MAX_BOUNDARY}
        />
      ))}
    </g>
  );
}

export default CurvePoints;
