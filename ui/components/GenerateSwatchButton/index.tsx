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
    createSwatch,
  } = useColorPicker(
    useShallow((state) => {
      const {
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        createSwatch,
      } = state;

      return {
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        createSwatch,
      };
    }),
  );

  const handleGenerateSwatch = () => {
    createSwatch({
      endPoint,
      endPointHandle,
      hue,
      startPoint,
      startPointHandle,
      stepCount,
      name: getNameFromHue(hue),
    });
  };

  return (
    <div>
      <Button className="flex gap-2" onClick={handleGenerateSwatch}>
        <ColorsIcon width={16} height={16} />
        Generate Color Swatch
      </Button>
    </div>
  );
}

export default GenerateSwatchButton;
