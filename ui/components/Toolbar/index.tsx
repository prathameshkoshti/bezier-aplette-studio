import CurlyBrackets from '@components/Icons/CurlyBrackets';
import Export from '@components/Icons/Export';
import Button from '@components/ui/button';
import useColorPicker from '@store/colorPicker';
import { useShallow } from 'zustand/react/shallow';

function Toolbar() {
  const { swatches } = useColorPicker(
    useShallow((state) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { swatches } = state;
      return { swatches };
    }),
  );

  const atLeastOneSwatchCreated = swatches.length > 0;

  return (
    <div className="border border-solid border-zinc-200 rounded-lg p-4 flex gap-4 justify-end">
      <Button
        variant="secondary"
        className="flex gap-2"
        disabled={!atLeastOneSwatchCreated}
      >
        <CurlyBrackets width={16} height={16} />
        Tokens
      </Button>
      <Button className="flex gap-2" disabled={!atLeastOneSwatchCreated}>
        <Export width={16} height={16} stroke="white" />
        Export Swatches
      </Button>
    </div>
  );
}

export default Toolbar;
