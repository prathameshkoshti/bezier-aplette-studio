import Curve from '@components/Icons/Curve';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import useColorPicker from '@store/colorPicker';
import { useShallow } from 'zustand/react/shallow';

function FreeHandMode() {
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
    <div className="flex items-center justify-end gap-2 py-2">
      <ToggleGroup type="single" onClick={handleFreeHandMode}>
        <ToggleGroupItem value="freeHandMode" aria-label="Free Hand Mode">
          <Curve />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default FreeHandMode;
