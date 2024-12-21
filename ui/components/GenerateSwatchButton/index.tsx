/* eslint-disable @typescript-eslint/no-shadow */
import { useShallow } from 'zustand/react/shallow';
import Button from '@components/ui/button';
import PaintBucket from '@components/Icons/PaintBucket';
import useColorPicker from '@store/colorPicker';

function GenerateSwatchButton() {
  const {
    endPoint,
    endPointHandle,
    hue,
    startPoint,
    startPointHandle,
    stepCount,
    swatchEditingId,
    swatchName,
    createSwatch,
    updateSwatch,
  } = useColorPicker(
    useShallow((state) => {
      const {
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        swatchEditingId,
        swatchName,
        createSwatch,
        updateSwatch,
      } = state;

      return {
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        swatchEditingId,
        swatchName,
        createSwatch,
        updateSwatch,
      };
    }),
  );

  const handleOnClick = () => {
    if (swatchEditingId) {
      updateSwatch({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        name: swatchName,
        id: swatchEditingId,
      });
    } else {
      createSwatch({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        name: swatchName,
      });
    }
  };

  const buttonText = swatchEditingId ? 'Update Swatch' : 'Generate Swatch';

  return (
    <div className="flex justify-end">
      <Button className="flex gap-2" onClick={handleOnClick}>
        <PaintBucket width={16} height={16} fill="white" />
        {buttonText}
      </Button>
    </div>
  );
}

export default GenerateSwatchButton;
