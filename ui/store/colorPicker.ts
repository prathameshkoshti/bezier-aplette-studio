import { create } from 'zustand';
import { createCoordinatesSlice, createInputsSlice } from './slices';

const useColorPicker = create<
  ReturnType<typeof createInputsSlice> &
    ReturnType<typeof createCoordinatesSlice>
>()((set) => ({
  ...createInputsSlice(set),
  ...createCoordinatesSlice(set),
}));

export default useColorPicker;
