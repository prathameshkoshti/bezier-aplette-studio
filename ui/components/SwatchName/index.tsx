/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { getNameFromHue } from '@utils/index';
import useColorPicker from '@store/colorPicker';
import Checkbox from '@components/ui/checkbox';

function SwatchName() {
  const {
    hue,
    swatchName,
    updateSwatchName,
    autoGenerateSwatchName,
    updateAutoGenerateSwatchName,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue,
        swatchName,
        updateSwatchName,
        autoGenerateSwatchName,
        updateAutoGenerateSwatchName,
      } = state;
      return {
        hue,
        swatchName,
        updateSwatchName,
        autoGenerateSwatchName,
        updateAutoGenerateSwatchName,
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
      updateSwatchName(getNameFromHue(hue));
    }
  }, [autoGenerateSwatchName, hue, updateSwatchName]);

  return (
    <div className="flex items-center gap-4 mb-4">
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
          Auto Generate Name
        </Label>
      </div>
    </div>
  );
}

export default SwatchName;
