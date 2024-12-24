import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
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
import { getColorsFromCoordinates } from '@utils';
import Button from '@components/ui/button';
import EditIcon from '@components/Icons/Edit';
import DeleteIcon from '@components/Icons/Delete';
import type { SwatchProps } from './types';

function Swatch({ deleteSwatch, loadSwatch, swatch, isEditing }: SwatchProps) {
  const { id } = swatch;

  const swatchAccordionClasses = clsx(
    'border border-zinc-300 border-solid mb-4 rounded-lg overflow-hidden',
    isEditing ? 'border-violet-400' : '',
  );

  const colors = getColorsFromCoordinates(swatch);

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
                  <DeleteIcon
                    width={18}
                    height={18}
                    stroke="hsl(var(--destructive))"
                  />
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
