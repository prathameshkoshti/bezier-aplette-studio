import Checkbox from '@components/ui/checkbox';
import { Label } from '@radix-ui/react-label';
import useColorPicker from '@store/colorPicker';
import { useShallow } from 'zustand/react/shallow';

function FreeHandCheckbox() {
  const { freeHand, updateFreeHand } = useColorPicker(
    useShallow((state) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { freeHand, updateFreeHand } = state;
      return { freeHand, updateFreeHand };
    }),
  );

  const handleFreeHandCheckbox = () => {
    updateFreeHand(!freeHand);
  };

  return (
    <div className="flex items-center gap-2 py-2">
      <Checkbox id="free-hand" onChange={handleFreeHandCheckbox} />
      <Label className="cursor-pointer" htmlFor="free-hand">
        Free Hand
      </Label>
    </div>
  );
}

export default FreeHandCheckbox;
