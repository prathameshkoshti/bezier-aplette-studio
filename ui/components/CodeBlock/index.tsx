import js_beautify from 'js-beautify';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import CopyIcon from '@components/Icons/Copy';
import Button from '@components/ui/button';
import type { CodeBlockProps } from './types';

function CodeBlock({ code }: CodeBlockProps) {
  const formattedCode = js_beautify(code, { indent_size: 2 });

  const copyToClipboard = () => {
    (async () => {
      try {
        await navigator.clipboard.writeText(formattedCode);
        toast.success('Swatches copied to clipboard.');
      } catch (err) {
        console.error('Failed to copy: ', err);
        toast.error('Uh oh! Text cannot be copied, try again later.');
      }
    })();
  };

  return (
    <div className="overflow-auto max-h-96">
      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter language="json" style={nightOwl} showLineNumbers>
          {formattedCode}
        </SyntaxHighlighter>
      </div>
      <div className="absolute right-10 bottom-10">
        <TooltipProvider delayDuration={1}>
          <Tooltip>
            <TooltipTrigger>
              <Button size="sm" variant="outline" onClick={copyToClipboard}>
                <CopyIcon width={18} height={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Tokens</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default CodeBlock;
