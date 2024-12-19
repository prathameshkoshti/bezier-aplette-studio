import { uuid } from '@utils';
import type {
  CoordinatesAction,
  CoordinatesState,
  GetFunction,
  InputsAction,
  InputsState,
  PresetsAction,
  PresetsState,
  SetFunction,
  SwatchesAction,
  SwatchesState,
} from './types';

export const createInputsSlice = (
  set: SetFunction,
): InputsState & InputsAction => ({
  // initial state values
  hue: 0,
  curveType: '',
  curveSubType: '',
  stepCount: 3,
  freeHandMode: true,

  // state update action
  updateHue: (hue) => set({ hue }),

  updateCurveType: (curveType) => set({ curveType }),

  updateCurveSubType: (curveSubType) => set({ curveSubType }),

  updateStepCount: (stepCount) => set({ stepCount }),

  updateFreeHandMode: (freeHandMode) => set({ freeHandMode }),
});

export const createCoordinatesSlice = (
  set: SetFunction,
): CoordinatesState & CoordinatesAction => ({
  // initial state values
  startPoint: {
    x: 95,
    y: 95,
  },
  endPoint: {
    x: 360,
    y: 360,
  },
  startPointHandle: {
    x: 360,
    y: 95,
  },
  endPointHandle: {
    x: 360,
    y: 95,
  },

  // state update action
  updateStartPoint: (startPoint) => set({ startPoint }),

  updateEndPoint: (endPoint) => set({ endPoint }),

  updateStartPointHandle: (startPointHandle) => set({ startPointHandle }),

  updateEndPointHandle: (endPointHandle) => set({ endPointHandle }),
});

export const createPresetsSlice = (
  set: SetFunction,
  get: GetFunction,
): PresetsState & PresetsAction => ({
  presets: [],
  loadPreset: (id: string) => {
    const preset = get().presets.find((p) => p.id === id);
    if (preset) {
      set({
        hue: preset.hue,
        stepCount: preset.stepCount,
        startPoint: preset.startPoint,
        endPoint: preset.endPoint,
        startPointHandle: preset.startPoint,
        endPointHandle: preset.endPointHandle,
      });
    }
  },
});

export const createSwatchesSlice = (
  set: SetFunction,
  get: GetFunction,
): SwatchesState & SwatchesAction => ({
  swatches: [],
  swatchEditingId: null,
  createSwatch: (swatch) => {
    const { swatches } = get();
    swatches.push({ ...swatch, id: uuid() });
    set({ swatches });
  },

  updateSwatch: (swatch) => {
    const { swatches, swatchEditingId } = get();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const index = swatches.findIndex((swatch) => swatch.id === swatchEditingId);
    if (index >= 0) {
      swatches[index] = swatch;
    }
    set({ swatches });
  },

  deleteSwatch: (id) => {
    const { swatches } = get();
    const index = swatches.findIndex((swatch) => swatch.id === id);
    swatches.splice(index, 1);
    set({ swatches });
  },

  loadSwatch: (id) => {
    const { swatches } = get();
    const swatch = swatches.find((s) => s.id === id);
    if (swatch) {
      const {
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
      } = swatch;
      set({
        endPoint,
        endPointHandle,
        hue,
        startPoint,
        startPointHandle,
        stepCount,
        swatchEditingId: id,
      });
    }
  },

  unloadSwatch: () => {
    set({ swatchEditingId: null });
  },

  renameSwatch: (id, name) => {
    const { swatches } = get();
    const index = swatches.findIndex((swatch) => swatch.id === id);
    swatches[index].name = name;
    set({ swatches });
  },
});
