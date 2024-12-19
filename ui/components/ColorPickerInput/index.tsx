import ColorPicker from '@components/ColorPicker';
import StepCount from '@components/StepCount';
import CurveTypeSelect from '@components/CurveType';
import FreeHandModeCheckbox from '@components/FreeHandModeCheckbox';
import GenerateSwatchButton from '@components/GenerateSwatchButton';
import SwatchName from '@components/SwatchName';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  return (
    <div className={styles.swatchGenerator}>
      <FreeHandModeCheckbox />
      <ColorPicker />
      <SwatchName />
      <div className="flex gap-4 mb-4">
        <StepCount />
        <CurveTypeSelect />
      </div>
      <GenerateSwatchButton />
    </div>
  );
}

export default ColorPickerInput;
