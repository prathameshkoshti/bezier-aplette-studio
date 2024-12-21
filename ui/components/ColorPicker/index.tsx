import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import type { HueValue } from '@appTypes/color';
import { Input } from '@components/ui/input';
import BezierCurveGraph from '@components/BezierCurveGraph';
import useColorPicker from '@store/colorPicker';
import styles from './colorPicker.module.css';

const hueRangeClasses = clsx(
  'appearance-none my-4 mx-0 px-0 border-0 cursor-pointer',
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
  const { hue, updateHue } = useColorPicker(
    useShallow((state) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { hue, updateHue, curveType, curveSubType } = state;
      return { hue, updateHue, curveType, curveSubType };
    }),
  );

  const handleHueRangeSlider = (event: FormEvent<HTMLInputElement>) => {
    const { value = '0' } = event.currentTarget;
    updateHue(parseInt(value, 10) as HueValue);
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
        <BezierCurveGraph />
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
