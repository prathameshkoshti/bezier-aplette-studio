import type { HandleProps } from './types';

function Handle({
  x,
  y,
  pointCoords,
}: HandleProps) {
  return (
    <g>
      <line
        x1={pointCoords.x}
        y1={pointCoords.y}
        x2={x}
        y2={y}
        stroke="black"
        strokeDashoffset={10}
        strokeDasharray={10}
      />
    </g>
  );
}

export default Handle;
