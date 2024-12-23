import { useShallow } from 'zustand/react/shallow';
import useColorPicker from '@store/colorPicker';
import { Accordion } from '@components/ui/accordion';
import Swatch from './components/Swatch';

function Swatches() {
  const { swatches, swatchEditingId, deleteSwatch, loadSwatch } =
    useColorPicker(
      useShallow((state) => {
        const {
          swatches: swatchesState,
          swatchEditingId: swatchEditingIdState,
          deleteSwatch: deleteSwatchState,
          loadSwatch: loadSwatchState,
        } = state;
        return {
          swatches: swatchesState,
          swatchEditingId: swatchEditingIdState,
          deleteSwatch: deleteSwatchState,
          loadSwatch: loadSwatchState,
        };
      }),
    );

  return (
    <div className="flex-1 p-4 overflow-auto border border-solid border-zinc-200 rounded-lg">
      <div className="accordion-container">
        <Accordion type="single" collapsible className="w-full">
          {swatches.map((swatch) => (
            <Swatch
              key={swatch.id}
              swatch={swatch}
              deleteSwatch={deleteSwatch}
              loadSwatch={loadSwatch}
              isEditing={swatchEditingId === swatch.id}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Swatches;
