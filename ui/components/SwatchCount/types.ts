import type { ChangeEventHandler } from 'react';

export type SwatchCountProps = {
  steps: number;
  handleSwatchCount: ChangeEventHandler<HTMLInputElement>;
};
