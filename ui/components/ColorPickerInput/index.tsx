import type { ChangeEventHandler } from 'react';
import type { CurveSubType, CurveType } from '@appTypes/curves';
import ColorPicker from '@components/ColorPicker';
import SwatchCount from '@components/SwatchCount';
import useColorPicker from '@store/colorPicker';
import CurveTypeSelect from '@components/CurveType';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  const {
    stepCount,
    updateStepCount,
    curveType,
    updateCurveType,
    curveSubType,
    updateCurveSubType,
  } = useColorPicker();

  const handleSwatchCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateStepCount(+event.currentTarget.value);
  };

  const handleCurveType = (type: CurveType) => {
    updateCurveType(type);
  };

  const handleCurveSubType = (subType: CurveSubType) => {
    updateCurveSubType(subType);
  };

  return (
    <div className={styles.swatchGenerator}>
      <ColorPicker />
      <div className="flex gap-4">
        <SwatchCount steps={stepCount} handleSwatchCount={handleSwatchCount} />
        <CurveTypeSelect
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
