"use client";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useTransition } from "react";
import { toast } from "sonner";
import { toggleSketchVisibility } from "../actions";

type Props = {
  sketchId: string;
  isPublic: boolean;
};

export default function ToggleVisibilityButton({ sketchId, isPublic }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleToogle = () =>
    startTransition(async () => {
      const result = await toggleSketchVisibility({ sketchId });

      if (result.success) {
        toast.success("Toggled visibility successfully");
        return;
      }

      toast.error("Failed to toggle visibility");
    });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleToogle}
            disabled={isPending}
          >
            {isPublic ? (
              <EyeOpenIcon className="h-5 w-5" />
            ) : (
              <EyeNoneIcon className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[200px]">
          {isPublic
            ? "Currently visible to everyone. Click  to make private"
            : "Currently invisible. Click to make public"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
