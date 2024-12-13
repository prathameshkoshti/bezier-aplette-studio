import type { HueValue } from '@appTypes/color';

export type ColorPickerProps = {
  hue: HueValue;
  updateHue: (value: HueValue) => void;
};
