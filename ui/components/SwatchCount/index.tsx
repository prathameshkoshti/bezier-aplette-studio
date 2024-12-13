import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import type { SwatchCountProps } from './types';

function SwatchCount({ steps, handleSwatchCount }: SwatchCountProps) {
  return (
    <div className="w-20 flex flex-col gap-2">
      <Label htmlFor="swatch-count">Steps</Label>
      <Input
        id="swatch-count"
        type="number"
        min={2}
        max={20}
        value={steps}
        onChange={handleSwatchCount}
      />
    </div>
  );
}

export default SwatchCount;
