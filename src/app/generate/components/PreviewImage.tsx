import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui";
import Image from "next/image";
import { useTransition } from "react";
import { deleteFiles } from "../actions/deleteFiles";
import { toast } from "sonner";
import { useFormContext } from "react-hook-form";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  alt: string;
  urlName: string;
  keyName: string;
};

export default function PreviewImage({ alt, urlName, keyName }: Props) {
  const [isPending, startTransition] = useTransition();
  const { setValue, getValues } = useFormContext();

  const handleClick = () =>
    startTransition(async () => {
      const result = await deleteFiles([getValues(keyName)]);

      if (!result.success) {
        toast.error("Failed to delete file");
        return;
      }

      setValue(urlName, "");
      setValue(keyName, undefined);
      toast.success("Deleted file successfully");
    });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm">Preview</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleClick}
                disabled={isPending}
                aria-label="Delete image"
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-destructive text-destructive-foreground">
              Delete image
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={getValues(urlName)}
          alt={alt}
          fill
          className="absolute left-0 top-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
