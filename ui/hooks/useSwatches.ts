import useColorPicker from '@store/colorPicker';
import { Bezier } from 'bezier-js';
import { useShallow } from 'zustand/react/shallow';

const useSwatches = () => {
  const {
    hue,
    startPoint,
    endPoint,
    startPointHandle,
    endPointHandle,
    stepCount,
  } = useColorPicker(
    useShallow((state) => {
      const {
        hue: hueState,
        startPoint: startPointState,
        endPoint: endPointState,
        startPointHandle: startPointHandleState,
        endPointHandle: endPointHandleState,
        stepCount: stepCountState,
      } = state;

      return {
        hue: hueState,
        startPoint: startPointState,
        endPoint: endPointState,
        startPointHandle: startPointHandleState,
        endPointHandle: endPointHandleState,
        stepCount: stepCountState,
      };
    }),
  );

  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  const swatchesCoordinates = curve.getLUT(stepCount - 1);

  return { swatchesCoordinates, hue };
};

export default useSwatches;
