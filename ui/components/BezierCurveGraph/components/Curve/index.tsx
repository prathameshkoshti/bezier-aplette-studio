import type { CurveProps } from './types';

function Curve({
  endPoint,
  endPointHandle,
  startPoint,
  startPointHandle,
}: CurveProps) {
  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  const path = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  return <path d={path} stroke="white" fill="transparent" />;
}

export default Curve;
