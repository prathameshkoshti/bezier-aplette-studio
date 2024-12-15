import ColorPicker from '@components/ColorPicker';
import Button from '@components/ui/button';
import StepCount from '@components/StepCount';
import CurveTypeSelect from '@components/CurveType';
import FreeHandModeCheckbox from '@components/FreeHandModeCheckbox';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  return (
    <div className={styles.swatchGenerator}>
      <ColorPicker />
      <FreeHandModeCheckbox />
      <div className="flex gap-4 mb-4">
        <StepCount />
        <CurveTypeSelect />
      </div>
      <div>
        <Button>Generate Color Swatch</Button>
      </div>
    </div>
  );
}

export default ColorPickerInput;
