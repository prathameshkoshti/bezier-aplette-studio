import ColorPicker from '@components/ColorPicker';
import StepCount from '@components/StepCount';
import CurveTypeSelect from '@components/CurveType';
import FreeHandModeCheckbox from '@components/FreeHandModeCheckbox';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  return (
    <div className={styles.swatchGenerator}>
      <ColorPicker />
      <FreeHandModeCheckbox />
      <div className="flex gap-4">
        <CurveTypeSelect />
        <StepCount />
      </div>
    </div>
  );
}

export default ColorPickerInput;
