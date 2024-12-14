import { useShallow } from 'zustand/react/shallow';
import type { ChangeEventHandler } from 'react';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import useColorPicker from '@store/colorPicker';

function SwatchCount() {
  const { stepCount, updateStepCount } = useColorPicker(
    useShallow((state) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { stepCount, updateStepCount } = state;
      return { stepCount, updateStepCount };
    }),
  );

  const handleSwatchCount: ChangeEventHandler<HTMLInputElement> = (event) => {
    updateStepCount(+event.currentTarget.value);
  };
  return (
    <div className="w-20 flex flex-col gap-2">
      <Label htmlFor="swatch-count">Steps</Label>
      <Input
        id="swatch-count"
        type="number"
        min={2}
        max={20}
        value={stepCount}
        onChange={handleSwatchCount}
      />
    </div>
  );
}

export default SwatchCount;
