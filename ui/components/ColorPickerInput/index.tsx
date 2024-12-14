import ColorPicker from '@components/ColorPicker';
import SwatchCount from '@components/SwatchCount';
import CurveTypeSelect from '@components/CurveType';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  return (
    <div className={styles.swatchGenerator}>
      <ColorPicker />
      <div className="flex gap-4">
        <SwatchCount />
        <CurveTypeSelect />
      </div>
    </div>
  );
}

export default ColorPickerInput;
