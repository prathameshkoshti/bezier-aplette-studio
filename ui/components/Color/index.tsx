import { hex, score } from 'wcag-contrast';
import clsx from 'clsx';
import type { ColorProps } from './types';

const BLACK_COLOR = '#000';
const WHITE_COLOR = '#fff';

function Color({ color, number, token }: ColorProps) {
  const whiteContrast = hex(color, WHITE_COLOR);
  const whiteContrastScore = score(whiteContrast);

  const blackContrast = hex(color, BLACK_COLOR);
  const blackContrastScore = score(blackContrast);

  const primaryInfoClasses = clsx('flex gap-3 text-base', {
    'text-black': whiteContrast < blackContrast,
    'text-white': whiteContrast > blackContrast,
  });

  return (
    <div
      key={color}
      className="w-full p-6 flex flex-col gap-4"
      style={{ background: color }}
    >
      <div className="flex justify-between">
        <div className={primaryInfoClasses}>
          <span>{number}</span>
          <span>{color}</span>
        </div>
        <div>
          <span className="rounded-full bg-white border-neutral-300 border border-solid py-1 px-2 text-neutral-900">
            {token}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="rounded-full bg-white text-black border-neutral-300 border border-solid py-1 px-3">
          {whiteContrast.toFixed(2)}: {whiteContrastScore}
        </span>
        <span className="rounded-full bg-black text-white border-neutral-1000 border border-solid py-1 px-3">
          {blackContrast.toFixed(2)}: {blackContrastScore}
        </span>
      </div>
    </div>
  );
}

export default Color;
