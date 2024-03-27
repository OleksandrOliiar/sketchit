"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import Canvas from "./Canvas";
import { createSketchFields, createSketchSchema } from "../validations/sketch";
import { createSketch } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateSketchForm() {
  const router = useRouter();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const form = useForm<createSketchFields>({
    resolver: zodResolver(createSketchSchema),
    defaultValues: {
      prompt: "",
      height: 768,
      width: 768,
      numOutputs: 1,
    },
  });

  async function onSubmit(data: createSketchFields) {
    if (!canvasRef.current) return;

    const image = await canvasRef.current.exportImage("jpeg");
    const result = await createSketch({ ...data, image });

    if (result.success) {
      toast.success("Generated successfully");
      form.reset();
      router.push("/collection");
      return;
    }

    toast.error("Failed to generate");
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="mb-5">Step 1: Enter a prompt</h3>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="mb-10 max-w-[500px]">
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input
                  placeholder="Example: An astronaut riding a rainbow unicorn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h3 className="mb-5">Step 2: Create a sketch</h3>
        <div className="mb-10">
          <Canvas ref={canvasRef} />
        </div>
        <h3 className="mb-5">Step 3: Configure output</h3>
        <FormField
          control={form.control}
          name="numOutputs"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Number of images</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(+value)}
                defaultValue="1"
              >
                <FormControl>
                  <SelectTrigger className="max-w-[125px]">
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-w-[125px]">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-7 flex items-center gap-7">
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem className="basis-[300px]">
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem className="basis-[300px]">
                <FormLabel>Height</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-5">
          <Button size="lg" disabled={isSubmitting}>
            Generate
          </Button>
          {isSubmitting && (
            <span className="text-sm text-muted-foreground">
              (This may take a few seconds)
            </span>
          )}
        </div>
      </form>
    </Form>
  );
}
