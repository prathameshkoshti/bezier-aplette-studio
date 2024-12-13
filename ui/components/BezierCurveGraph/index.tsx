import { useEffect, useRef, useState } from 'react';
import type { Point as PointType } from '@appTypes/coords';
import { COLOR_PICKER_CONTAINER_SIZE } from '@constants/colors';
import type { BezierCurveGraphProps } from './types';
import Curve from './components/Curve';
import Handle from './components/Handle';
import Point from './components/Point';
import styles from './bezierCurveGraph.module.css';

function BezierCurveGraph({
  hue,
  startPoint,
  endPoint,
  startPointHandle,
  endPointHandle,
  handlePointCoords,
}: BezierCurveGraphProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [elementPosition, setElementPosition] = useState<PointType | undefined>(
    undefined,
  );
  const [elementDimensions, setElementDimensions] = useState<
    { min: PointType; max: PointType } | undefined
  >(undefined);

  useEffect(() => {
    if (containerRef.current) {
      const dimensions = containerRef.current.getBoundingClientRect();
      setElementPosition({
        x: dimensions.x,
        y: dimensions.y,
      });
      setElementDimensions({
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: dimensions.width,
          y: dimensions.height,
        },
      });
    }
  }, []);

  return (
    <svg
      ref={containerRef}
      className={styles.bezierCurveGraphContainer}
      width={COLOR_PICKER_CONTAINER_SIZE}
      height={COLOR_PICKER_CONTAINER_SIZE}
    >
      <Handle
        x={startPointHandle.x}
        y={startPointHandle.y}
        pointCoords={{
          x: startPoint.x,
          y: startPoint.y,
        }}
      />

      <Handle
        x={endPointHandle.x}
        y={endPointHandle.y}
        pointCoords={{
          x: endPoint.x,
          y: endPoint.y,
        }}
      />
      <Curve
        startPoint={startPoint}
        endPoint={endPoint}
        startPointHandle={startPointHandle}
        endPointHandle={endPointHandle}
      />
      <Point
        x={startPointHandle.x}
        y={startPointHandle.y}
        type="startPointHandle"
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
        maxBoundary={elementDimensions?.max}
        minBoundary={elementDimensions?.min}
      />
      <Point
        x={endPointHandle.x}
        y={endPointHandle.y}
        type="endPointHandle"
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
        maxBoundary={elementDimensions?.max}
        minBoundary={elementDimensions?.min}
      />
      <Point
        hue={hue}
        x={startPoint.x}
        y={startPoint.y}
        type="startPoint"
        maxBoundary={{
          x: 375,
          y: 375,
        }}
        minBoundary={{
          x: 75,
          y: 75,
        }}
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
      />
      <Point
        hue={hue}
        x={endPoint.x}
        y={endPoint.y}
        type="endPoint"
        maxBoundary={{
          x: 375,
          y: 375,
        }}
        minBoundary={{
          x: 75,
          y: 75,
        }}
        parentCoords={elementPosition}
        handlePointCoords={handlePointCoords}
      />
    </svg>
  );
}

export default BezierCurveGraph;
