import { useEffect, useState } from 'react';
import convertColor from 'color-convert';
import type { MouseEventHandler } from 'react';
import type { PointProps } from './types';
import styles from './point.module.css';

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function Point({
  hue,
  x,
  y,
  type,
  maxBoundary,
  minBoundary,
  parentCoords,
  handlePointCoords,
}: PointProps) {
  const [color, setColor] = useState('transparent');
  const { x: maxX, y: maxY } = maxBoundary ?? { x: 0, y: 0 };
  const { x: minX, y: minY } = minBoundary ?? { x: 0, y: 0 };

  const handleMouseDown: MouseEventHandler = () => {
    if (parentCoords) {
      const { x: parentX, y: parentY } = parentCoords;
      document.onmousemove = (event) => {
        let newX = event.pageX - parentX;
        let newY = event.pageY - parentY;
        // create boundary for x coord
        if (newX > maxX) newX = maxX;
        else if (newX < minX) newX = minX;

        // create boundary for y coord
        if (newY > maxY) newY = maxY;
        else if (newY < minY) newY = minY;

        handlePointCoords(
          {
            x: newX,
            y: newY,
          },
          type,
        );
      };

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  };

  const isHandle = type.includes('Handle');

  useEffect(() => {
    if (minBoundary && maxBoundary && !isHandle && typeof hue !== 'undefined') {
      const saturationPoint = x - minBoundary.x;
      const brightnessPoint = y - minBoundary.y;

      const colorPickerWidth = maxBoundary.x - minBoundary.x;
      const colorPickerHeight = maxBoundary.y - minBoundary.y;

      const saturation = clamp(
        (saturationPoint / colorPickerWidth) * 100,
        0,
        100,
      );
      const lightness = clamp(
        100 - (brightnessPoint / colorPickerHeight) * 100,
        0,
        100,
      );
      const newColor = convertColor.hsv.hex([hue, saturation, lightness]);
      setColor(`#${newColor}`);
    }
  }, [hue, isHandle, maxBoundary, minBoundary, x, y]);

  return (
    <g className={styles.point} onMouseDown={handleMouseDown}>
      {!isHandle ? (
        <>
          <circle
            cx={x}
            cy={y}
            r="6"
            fill={color}
            strokeWidth="1"
            stroke="grey"
            strokeLinecap="round"
          />
          <circle
            cx={x}
            cy={y}
            r="5"
            fill={color}
            strokeWidth="3"
            stroke="white"
            strokeLinecap="round"
          />
        </>
      ) : (
        <rect
          x={x - 4}
          y={y - 4}
          width={8}
          height={8}
          fill="white"
          strokeWidth="1"
          stroke="grey"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export default Point;
