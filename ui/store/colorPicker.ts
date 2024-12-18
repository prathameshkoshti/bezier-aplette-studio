import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  createCoordinatesSlice,
  createInputsSlice,
  createPresetsSlice,
  createSwatchesSlice,
} from './slices';

const useColorPicker = create<
  ReturnType<typeof createInputsSlice> &
    ReturnType<typeof createCoordinatesSlice> &
    ReturnType<typeof createPresetsSlice> &
    ReturnType<typeof createSwatchesSlice>
>()(
  devtools((set, get) => ({
    ...createInputsSlice(set),
    ...createCoordinatesSlice(set),
    ...createPresetsSlice(set, get),
    ...createSwatchesSlice(set, get),
  })),
);

export default useColorPicker;
