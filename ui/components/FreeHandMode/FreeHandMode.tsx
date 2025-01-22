import CurveIcon from '@components/Icons/Curve';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import useColorPicker from '@store/colorPicker';
import { useShallow } from 'zustand/react/shallow';
import styles from './freeHandMode.module.css';

function FreeHandMode() {
  const { freeHandMode, updateFreeHandMode } = useColorPicker(
    useShallow((state) => {
      const {
        freeHandMode: freeHandModeState,
        updateFreeHandMode: updateFreeHandModeState,
      } = state;
      return {
        freeHandMode: freeHandModeState,
        updateFreeHandMode: updateFreeHandModeState,
      };
    }),
  );

  const handleFreeHandMode = () => {
    updateFreeHandMode(!freeHandMode);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <TooltipProvider delayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroup
              type="single"
              variant="outline"
              defaultValue="freeHandMode"
              onClick={handleFreeHandMode}
            >
              <ToggleGroupItem
                className={styles.toggleGroupItem}
                value="freeHandMode"
                aria-label="Free Hand Mode"
              >
                <CurveIcon stroke="currentColor" />
              </ToggleGroupItem>
            </ToggleGroup>
          </TooltipTrigger>
          <TooltipContent>Toggle Free Hand Mode</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default FreeHandMode;
