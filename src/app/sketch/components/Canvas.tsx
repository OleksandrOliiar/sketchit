import { ChangeEvent, RefObject, forwardRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import {
  Button,
  Input,
  Label,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui";
import {
  EraserIcon,
  Pencil1Icon,
  ReloadIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons";

export default forwardRef(
  // @ts-ignore
  (_, canvasRef: RefObject<ReactSketchCanvasRef>) => {
    const [canvasTools, setCanvasTools] = useState({
      mode: "pencil",
      strokeWidth: 5,
      eraserWidth: 10,
      strokeColor: "#ff9494",
      canvasColor: "#ffffff",
      backgroundImage: "",
    });

    const handleModeChange = (mode: "pencil" | "eraser") => {
      setCanvasTools((prev) => ({ ...prev, mode }));

      if (mode === "pencil") {
        canvasRef.current?.eraseMode(false);
      } else {
        canvasRef.current?.eraseMode(true);
      }
    };

    const handleStrokeWidthChange = (value: number[]) => {
      setCanvasTools((prev) => ({ ...prev, strokeWidth: value[0] }));
    };

    const handleEraserWidthChange = (value: number[]) => {
      setCanvasTools((prev) => ({ ...prev, eraserWidth: value[0] }));
    };

    const handleUndoClick = () => {
      canvasRef.current?.undo();
    };

    const handleRedoClick = () => {
      canvasRef.current?.redo();
    };

    const handleClearClick = () => {
      canvasRef.current?.clearCanvas();
    };

    const handleStrokeColorChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCanvasTools((prev) => ({ ...prev, strokeColor: e.target.value }));
    };

    const handleCanvasColorChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCanvasTools((prev) => ({ ...prev, canvasColor: e.target.value }));
    };

    const handleBgImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCanvasTools((prev) => ({ ...prev, backgroundImage: e.target.value }));
    };

    return (
      <div className="flex items-center gap-10">
        <ReactSketchCanvas
          width="100%"
          height="150px"
          style={{ height: 475 }}
          svgStyle={{
            borderRadius: "0.375rem",
            height: "475px",
          }}
          className="!border-none"
          ref={canvasRef}
          strokeWidth={canvasTools.strokeWidth}
          eraserWidth={canvasTools.eraserWidth}
          strokeColor={canvasTools.strokeColor}
          canvasColor={canvasTools.canvasColor}
          backgroundImage={canvasTools.backgroundImage}
        />
        <div className="basis-4/5">
          <h3 className="mb-10">Tools</h3>
          <div className="mb-7 flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={handleUndoClick}
                  >
                    <ReloadIcon className="-scale-x-100 scale-y-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={handleRedoClick}
                  >
                    <ReloadIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={handleClearClick}
                  >
                    <ValueNoneIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear canvas</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mb-7 flex items-center gap-1">
            <ToggleGroup
              type="single"
              value={canvasTools.mode}
              onValueChange={handleModeChange}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value="pencil"
                      type="button"
                      disabled={canvasTools.mode === "pencil"}
                    >
                      <Pencil1Icon />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>Pencil</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value="eraser"
                      type="button"
                      disabled={canvasTools.mode === "eraser"}
                    >
                      <EraserIcon />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent>Eraser</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroup>
          </div>
          <div className="mb-7 flex max-w-[300px] flex-col gap-5">
            {canvasTools.mode === "eraser" ? (
              <>
                <Label htmlFor="eraserWidth">Eraser width</Label>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  id="eraserWidth"
                  defaultValue={[canvasTools.eraserWidth]}
                  onValueChange={handleEraserWidthChange}
                />
              </>
            ) : (
              <>
                <Label htmlFor="strokeWidth">Stroke width</Label>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  id="strokeWidth"
                  defaultValue={[canvasTools.strokeWidth]}
                  onValueChange={handleStrokeWidthChange}
                />
              </>
            )}
          </div>
          <div className="mb-1 flex items-center gap-[18px]">
            <Label htmlFor="strokeColor">Stroke color:</Label>
            <Input
              id="strokeColor"
              type="color"
              className="h-9 w-8 cursor-pointer appearance-none border-none bg-transparent p-0"
              onChange={handleStrokeColorChange}
              value={canvasTools.strokeColor}
            />
          </div>
          <div className="mb-7 flex items-center gap-3">
            <Label htmlFor="canvasColor">Canvas color:</Label>
            <Input
              id="canvasColor"
              type="color"
              className="h-9 w-8 cursor-pointer appearance-none border-none bg-transparent p-0"
              onChange={handleCanvasColorChange}
              value={canvasTools.canvasColor}
            />
          </div>
          <div className="max-w-[300px] space-y-2">
            <Label htmlFor="bgImage">Background Image URI</Label>
            <Input
              id="bgImage"
              value={canvasTools.backgroundImage}
              onChange={handleBgImageChange}
            />
          </div>
        </div>
      </div>
    );
  },
);
