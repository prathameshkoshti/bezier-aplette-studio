import { useShallow } from 'zustand/react/shallow';
import { getSwatchData } from '@utils/index';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import Button from '@components/ui/button';
import CurlyBrackets from '@components/Icons/CurlyBrackets';
import CodeBlock from '@components/CodeBlock';
import useColorPicker from '@store/colorPicker';
import type { TokensInfoModalProps } from './type';

function TokensInfoModal({ atLeastOneSwatchCreated }: TokensInfoModalProps) {
  const { swatches } = useColorPicker(
    useShallow((state) => {
      const { swatches: swatchesState } = state;
      return { swatches: swatchesState };
    }),
  );

  const swatchData = JSON.stringify(getSwatchData(swatches));

  return (
    <Dialog>
      <DialogTrigger disabled={!atLeastOneSwatchCreated}>
        <Button
          variant="secondary"
          className="flex gap-2"
          disabled={!atLeastOneSwatchCreated}
        >
          <CurlyBrackets width={16} height={16} />
          Tokens
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Tokens</DialogTitle>
        </DialogHeader>
        <CodeBlock code={swatchData} />
      </DialogContent>
    </Dialog>
  );
}

export default TokensInfoModal;
