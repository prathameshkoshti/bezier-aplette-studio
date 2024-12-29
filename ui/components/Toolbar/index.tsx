import { useShallow } from 'zustand/react/shallow';
import { getSwatchData } from '@utils/index';
import Button from '@components/ui/button';
import useColorPicker from '@store/colorPicker';
import TokensInfoModal from '@components/TokensInfoModal';
import ColorsIcon from '@components/Icons/Colors';
import ExportIcon from '@components/Icons/Export';

function Toolbar() {
  const { swatches } = useColorPicker(
    useShallow((state) => {
      const { swatches: swatchesState } = state;
      return { swatches: swatchesState };
    }),
  );

  const atLeastOneSwatchCreated = swatches.length > 0;

  const handleColorOperation = (operation: string) => {
    const swatchData = getSwatchData(swatches);
    parent.postMessage(
      {
        pluginMessage: {
          type: operation,
          colors: swatchData,
        },
      },
      '*',
    );
  };

  return (
    <div className="border border-solid border-zinc-200 rounded-lg p-4 flex gap-4 justify-end">
      <TokensInfoModal
        atLeastOneSwatchCreated={atLeastOneSwatchCreated}
        swatches={swatches}
      />
      <Button
        className="flex gap-2"
        variant="secondary"
        disabled={!atLeastOneSwatchCreated}
        onClick={() => handleColorOperation('export-color-palette')}
      >
        <ExportIcon width={16} height={16} />
        Export Palette
      </Button>
      <Button
        className="flex gap-2"
        disabled={!atLeastOneSwatchCreated}
        onClick={() => handleColorOperation('create-color-styles')}
      >
        <ColorsIcon width={16} height={16} stroke="white" />
        Create Styles
      </Button>
    </div>
  );
}

export default Toolbar;
