import clsx from 'clsx';
import ColorPicker from '@components/ColorPicker';
import StepCount from '@components/StepCount';
import CurveTypeSelect from '@components/CurveType';
import FreeHandModeCheckbox from '@components/FreeHandMode';
import GenerateSwatchButton from '@components/GenerateSwatchButton';
import SwatchName from '@components/SwatchName';
import PluginInfo from '@components/PluginInfo';
import styles from './colorPickerInput.module.css';

function ColorPickerInput() {
  const swatchGeneratorClasses = clsx(
    styles.swatchGenerator,
    'rounded-lg border border-zinc-200 border-solid p-4 m-4',
  );
  return (
    <div className={swatchGeneratorClasses}>
      <div className="flex items-end justify-between mb-4">
        <SwatchName />
        <StepCount />
      </div>
      <ColorPicker />
      <div className="flex gap-4 mb-4 items-end">
        <FreeHandModeCheckbox />
        <CurveTypeSelect />
      </div>
      <div className="flex justify-between">
        <PluginInfo />
        <GenerateSwatchButton />
      </div>
    </div>
  );
}

export default ColorPickerInput;
