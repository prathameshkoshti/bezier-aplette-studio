import clsx from 'clsx';
import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { CoordType, Point } from '@appTypes/coords';
import BezierCurveGraph from '@components/BezierCurveGraph';
import { Input } from '@components/ui/input';
import type { ColorPickerProps } from './types';
import styles from './colorPicker.module.css';

const hueRangeClasses = clsx(
  'appearance-none my-4 mx-0 px-0 border-0',
  styles.hueRange,
);

const colorPickerContainerClasses = clsx(
  'relative rounded-md z-20',
  styles.colorPickerContainer,
);
const colorGraph = clsx(styles.colorGraph);
const colorPickerClasses = clsx('relative rounded-md', styles.colorPicker);
const whiteOverlayClasses = clsx(
  'rounded-md absolute w-full h-full left-0 top-0',
  styles.whiteOverlay,
);
const blackOverlayClasses = clsx(
  'rounded-md absolute w-full h-full left-0 top-0',
  styles.blackOverlay,
);

function ColorPicker({ hue, updateHue }: ColorPickerProps) {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [startPoint, setStartPoint] = useState<Point>({
    x: 95,
    y: 95,
  });
  const [endPoint, setEndPoint] = useState({
    x: 360,
    y: 360,
  });

  const [startPointHandle, setStartPointHandle] = useState<Point>({
    x: 360,
    y: 95,
  });
  const [endPointHandle, setEndPointHandle] = useState({
    x: 360,
    y: 95,
  });

  const updateCoords: Record<
    CoordType,
    React.Dispatch<React.SetStateAction<Point>>
  > = useMemo(
    () => ({
      startPoint: setStartPoint,
      endPoint: setEndPoint,
      startPointHandle: setStartPointHandle,
      endPointHandle: setEndPointHandle,
    }),
    [],
  );

  const handlePointCoords = (coords: Point, type: CoordType) => {
    updateCoords[type](coords);
  };

  const handleHueRangeSlider = (event: FormEvent<HTMLInputElement>) => {
    const { value = '0' } = event.currentTarget;
    updateHue(parseInt(value, 10));
  };

  return (
    <div className={colorPickerContainerClasses}>
      <div className={colorGraph}>
        <div
          style={{ background: `hsl(${hue}deg 100% 50%)` }}
          className={colorPickerClasses}
          ref={colorPickerRef}
        >
          <div className={whiteOverlayClasses} />
          <div className={blackOverlayClasses} />
        </div>
        <BezierCurveGraph
          hue={hue}
          startPoint={startPoint}
          endPoint={endPoint}
          startPointHandle={startPointHandle}
          endPointHandle={endPointHandle}
          handlePointCoords={handlePointCoords}
        />
      </div>
      <Input
        onInput={handleHueRangeSlider}
        className={hueRangeClasses}
        type="range"
        min={0}
        max={360}
        value={hue}
      />
    </div>
  );
}

export default ColorPicker;
