import type { Swatch } from '@store/types';

export type SwatchProps = {
  swatch: Swatch;
  isEditing: boolean;
  loadSwatch: (id: string) => void;
  deleteSwatch: (id: string) => void;
};
