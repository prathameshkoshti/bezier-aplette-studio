import { useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { doesNameExistInArray, getNameFromHue } from '@utils/index';
import useColorPicker from '@store/colorPicker';
import Checkbox from '@components/ui/checkbox';

function SwatchName() {
  const {
    hue,
    swatchName,
    swatches,
    updateSwatchName,
    autoGenerateSwatchName,
    updateAutoGenerateSwatchName,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue: hueState,
        swatchName: swatchNameState,
        swatches: swatchesState,
        updateSwatchName: updateSwatchNameState,
        autoGenerateSwatchName: autoGenerateSwatchNameState,
        updateAutoGenerateSwatchName: updateAutoGenerateSwatchNameState,
      } = state;
      return {
        hue: hueState,
        swatchName: swatchNameState,
        swatches: swatchesState,
        updateSwatchName: updateSwatchNameState,
        autoGenerateSwatchName: autoGenerateSwatchNameState,
        updateAutoGenerateSwatchName: updateAutoGenerateSwatchNameState,
      };
    }),
  );

  const handleSwatchName: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateSwatchName(event.currentTarget.value);
  };

  const handleAutoGenerateSwatchName = () => {
    updateAutoGenerateSwatchName(!autoGenerateSwatchName);
  };

  useEffect(() => {
    if (autoGenerateSwatchName) {
      const name = getNameFromHue(hue);
      const swatchNames = swatches.map((swatch) => swatch.name);
      const newName = doesNameExistInArray(swatchNames, name);
      updateSwatchName(newName);
    }
  }, [autoGenerateSwatchName, hue, swatches, updateSwatchName]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col">
        <Label className="py-1.5 text-sm font-semibold" htmlFor="swatch-name">
          Name
        </Label>
        <Input
          id="swatch-name"
          type="text"
          className="w-32"
          value={swatchName}
          onChange={handleSwatchName}
          disabled={autoGenerateSwatchName}
        />
      </div>
      <div className="flex items-center gap-2 py-2 mt-8">
        <Checkbox
          id="auto-generate-checkbox"
          onClick={handleAutoGenerateSwatchName}
          checked={autoGenerateSwatchName}
        />
        <Label className="cursor-pointer" htmlFor="auto-generate-checkbox">
          Auto Generate
        </Label>
      </div>
    </div>
  );
}

export default SwatchName;
