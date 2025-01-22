import Button from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import GithubIcon from '@components/Icons/Github';
import InfoIcon from '@components/Icons/Info';

function PluginInfo() {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider delayDuration={1}>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" className="flex gap-2 px-3">
                <InfoIcon width={15} height={15} stroke="currentColor" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>About</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center justify-center gap-3">
              <div>{import.meta.env.VITE_APP_NAME}</div>
              <div className="text-sm flex items-center gap-2">
                <span>v{import.meta.env.VITE_APP_VERSION}</span>
                <TooltipProvider delayDuration={1}>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://github.com/phi-ui/bezier-palette-studio"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GithubIcon
                          width={16}
                          height={16}
                          fill="currentColor"
                        />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Github Repo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-sm flex justify-center items-center gap-1">
                <span>By</span>
                <div className="flex items-center gap-2">
                  <TooltipProvider delayDuration={1}>
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          href="https://prathameshkoshti.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-500 underline"
                        >
                          Prathamesh Koshti
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Portfolio</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          For any technical issues, specific queries or feature requests, you
          can drop me an email on{' '}
          <a
            className="text-purple-500 underline"
            href="mailto:prathameshkoshti@gmail.com"
          >
            prathameshkoshti@gmail.com
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PluginInfo;
