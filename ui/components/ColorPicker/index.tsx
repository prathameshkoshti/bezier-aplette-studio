import { useMemo, useRef } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import type { CoordType, Point } from '@appTypes/coords';
import type { CoordinatesAction } from '@store/types';
import { Input } from '@components/ui/input';
import BezierCurveGraph from '@components/BezierCurveGraph';
import useColorPicker from '@store/colorPicker';
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

function ColorPicker() {
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const {
    hue,
    updateHue,
    startPoint,
    updateStartPoint,
    endPoint,
    updateEndPoint,
    startPointHandle,
    updateStartPointHandle,
    endPointHandle,
    updateEndPointHandle,
  } = useColorPicker();

  const updateCoords: Record<
    CoordType,
    CoordinatesAction[keyof CoordinatesAction]
  > = useMemo(
    () => ({
      startPoint: updateStartPoint,
      endPoint: updateEndPoint,
      startPointHandle: updateStartPointHandle,
      endPointHandle: updateEndPointHandle,
    }),
    [
      updateEndPoint,
      updateEndPointHandle,
      updateStartPoint,
      updateStartPointHandle,
    ],
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
