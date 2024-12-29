import { getTokensData } from '@utils/index';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import Button from '@components/ui/button';
import CurlyBracketsIcon from '@components/Icons/CurlyBrackets';
import CodeBlock from '@components/CodeBlock';
import type { TokensInfoModalProps } from './type';

function TokensInfoModal({
  atLeastOneSwatchCreated,
  swatches,
}: TokensInfoModalProps) {
  const swatchData = JSON.stringify(getTokensData(swatches));

  return (
    <Dialog>
      <DialogTrigger disabled={!atLeastOneSwatchCreated}>
        <Button
          variant="secondary"
          className="flex gap-2"
          disabled={!atLeastOneSwatchCreated}
        >
          <CurlyBracketsIcon width={16} height={16} />
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
