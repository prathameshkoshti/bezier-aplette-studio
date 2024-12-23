import { useShallow } from 'zustand/react/shallow';
import Button from '@components/ui/button';
import useColorPicker from '@store/colorPicker';
import TokensInfoModal from '@components/TokensInfoModal';
import Colors from '@components/Icons/Colors';

function Toolbar() {
  const { swatches } = useColorPicker(
    useShallow((state) => {
      const { swatches: swatchesState } = state;
      return { swatches: swatchesState };
    }),
  );

  const atLeastOneSwatchCreated = swatches.length > 0;

  return (
    <div className="border border-solid border-zinc-200 rounded-lg p-4 flex gap-4 justify-end">
      <TokensInfoModal atLeastOneSwatchCreated={atLeastOneSwatchCreated} />
      <Button className="flex gap-2" disabled={!atLeastOneSwatchCreated}>
        <Colors width={16} height={16} stroke="white" />
        Create Styles
      </Button>
    </div>
  );
}

export default Toolbar;
