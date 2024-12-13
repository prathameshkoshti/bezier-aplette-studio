import { useCallback, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import type { HueValue } from '@appTypes/color';
import type { CurveTypes } from '@appTypes/curves';
import ColorPicker from '@components/ColorPicker';
import SwatchCount from '@components/SwatchCount';
import CurveType from '@components/CurveType';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  const [hue, setHue] = useState<HueValue>(0);
  const [curveType, setCurveType] = useState<CurveTypes>('sine');
  const [curveSubType, setCurveSubType] = useState('easeIn');

  const [steps, setSteps] = useState(3);

  const handleSwatchCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSteps(+event.currentTarget.value);
  };

  const handleCurveType = (type: CurveTypes) => {
    setCurveType(type);
  };

  const handleCurveSubType = (subType: string) => {
    setCurveSubType(subType);
  };

  const updateHue = useCallback((value: HueValue) => {
    setHue(value);
  }, []);

  return (
    <div className={styles.swatchGenerator}>
      <ColorPicker hue={hue} updateHue={updateHue} />
      <div className="flex gap-4">
        <SwatchCount
          steps={steps}
          handleSwatchCount={handleSwatchCount}
        />
        <CurveType
          curveType={curveType}
          curveSubType={curveSubType}
          handleCurveType={handleCurveType}
          handleCurveSubType={handleCurveSubType}
        />
      </div>
    </div>
  );
}

export default ColorPickerInput;
