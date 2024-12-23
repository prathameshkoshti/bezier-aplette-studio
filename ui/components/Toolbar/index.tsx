import { useShallow } from 'zustand/react/shallow';
import Export from '@components/Icons/Export';
import Button from '@components/ui/button';
import useColorPicker from '@store/colorPicker';
import TokensInfoModal from '@components/TokensInfoModal';

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
        <Export width={16} height={16} stroke="white" />
        Export Swatches
      </Button>
    </div>
  );
}

export default Toolbar;
