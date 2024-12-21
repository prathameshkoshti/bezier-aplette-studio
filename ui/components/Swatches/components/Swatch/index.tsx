import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { Bezier } from 'bezier-js';
import {
  MAX_BOUNDARY,
  MIN_BOUNDARY,
} from '@components/BezierCurveGraph/constants';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { getColorForCoordinates } from '@utils';
import Button from '@components/ui/button';
import EditIcon from '@components/Icons/Edit';
import DeleteIcon from '@components/Icons/Delete';
import type { SwatchProps } from './types';

function Swatch({ deleteSwatch, loadSwatch, swatch, isEditing }: SwatchProps) {
  const {
    id,
    hue,
    startPoint,
    endPoint,
    startPointHandle,
    endPointHandle,
    stepCount,
  } = swatch;

  const swatchAccordionClasses = clsx(
    'border border-zinc-300 border-solid mb-4 rounded-lg overflow-hidden',
    isEditing ? 'border-violet-400' : '',
  );

  const { x: x1, y: y1 } = startPoint;
  const { x: x2, y: y2 } = endPoint;
  const { x: cx1, y: cy1 } = startPointHandle;
  const { x: cx2, y: cy2 } = endPointHandle;

  const curve = new Bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  const colorsCords = curve.getLUT(stepCount - 1);

  const colors = colorsCords.map((colorCord) => {
    const { x, y } = colorCord;
    return getColorForCoordinates(hue, { x, y }, MIN_BOUNDARY, MAX_BOUNDARY);
  });

  const editColorSwatch: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    loadSwatch(id);
  };

  const deleteColorSwatch: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    deleteSwatch(id);
  };

  return (
    <AccordionItem value={swatch.id} className={swatchAccordionClasses}>
      <AccordionTrigger className="p-4">
        <div className="flex-1">{swatch.name}</div>
        <div className="mr-3 flex gap-2">
          <TooltipProvider delayDuration={1}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  className="px-2"
                  onClick={editColorSwatch}
                  disabled={isEditing}
                >
                  <EditIcon width={18} height={18} stroke="currentColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Swatch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={1}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  className="px-2"
                  onClick={deleteColorSwatch}
                >
                  <DeleteIcon width={18} height={18} stroke="currentColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Swatch</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="w-full overflow-y-auto rounded-xl">
          {colors.map((color) => (
            <div
              key={color}
              className="w-full h-20 "
              style={{ background: color }}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Swatch;
