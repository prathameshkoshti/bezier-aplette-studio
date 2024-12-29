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
import LinkIcon from '@components/Icons/Link';

function PluginInfo() {
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider delayDuration={1}>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" className="flex gap-2 px-3">
                <InfoIcon width={15} height={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Plugin Information</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center justify-center gap-3">
              <div>{import.meta.env.VITE_APP_NAME}</div>
              <div className="text-sm">v{import.meta.env.VITE_APP_VERSION}</div>
              <div className="flex gap-2">
                <TooltipProvider delayDuration={1}>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={import.meta.env.VITE_APP_GH_REPO}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GithubIcon />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Github Repo</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={1}>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href={import.meta.env.VITE_APP_CONTACT_WEBSITE}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkIcon />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>Website</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="text-center">
          For any technical issues, specific queries or feature requests, you
          can drop me an email on{' '}
          <a
            className="text-purple-500 underline"
            href={`mailto:${import.meta.env.VITE_APP_CONTACT_EMAIL}`}
          >
            {import.meta.env.VITE_APP_CONTACT_EMAIL}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PluginInfo;
