import Checkbox from '@components/ui/checkbox';
import { Label } from '@radix-ui/react-label';
import useColorPicker from '@store/colorPicker';
import { useShallow } from 'zustand/react/shallow';

function FreeHandModeCheckbox() {
  const { freeHandMode, updateFreeHandMode } = useColorPicker(
    useShallow((state) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { freeHandMode, updateFreeHandMode } = state;
      return { freeHandMode, updateFreeHandMode };
    }),
  );

  const handleFreeHandMode = () => {
    updateFreeHandMode(!freeHandMode);
  };

  return (
    <div className="flex items-center gap-2 py-2">
      <Checkbox
        id="free-hand"
        onClick={handleFreeHandMode}
        checked={freeHandMode}
      />
      <Label className="cursor-pointer" htmlFor="free-hand">
        Free Hand Mode
      </Label>
    </div>
  );
}

export default FreeHandModeCheckbox;
