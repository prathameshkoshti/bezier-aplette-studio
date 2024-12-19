/* eslint-disable @typescript-eslint/no-shadow */
import { useShallow } from 'zustand/react/shallow';
import { getNameFromHue } from '@utils';
import Button from '@components/ui/button';
import ColorsIcon from '@components/Icons/Colors';
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
        name: getNameFromHue(hue),
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
        name: getNameFromHue(hue),
      });
    }
  };

  const buttonText = swatchEditingId ? 'Update Swatch' : 'Generate Swatch';

  return (
    <div>
      <Button className="flex gap-2" onClick={handleOnClick}>
        <ColorsIcon width={16} height={16} />
        {buttonText}
      </Button>
    </div>
  );
}

export default GenerateSwatchButton;
