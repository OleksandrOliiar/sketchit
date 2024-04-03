"use client";

import {
  Button,
  Checkbox,
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
import { useForm } from "react-hook-form";
import { GenerateFields, generateSchema } from "../validations";
import { generate } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UploadDropzone from "./UploadDropzone";
import { useState } from "react";
import PreviewImage from "./PreviewImage";
import { z } from "zod";
import useFormPersist from "react-hook-form-persist";

type Props = {
  credits: number;
};

const numOuputValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function GenerateImageForm({ credits }: Props) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<
    GenerateFields & {
      originalFileKey: string;
      toBecomeFileKey: string;
    }
  >({
    resolver: zodResolver(
      generateSchema({ maxNumOutputs: credits }).merge(
        z.object({
          originalFileKey: z.string().nullable(),
          toBecomeFileKey: z.string().nullable(),
        }),
      ),
    ),
    defaultValues: {
      prompt: "",
      numOutputs: 1,
      isPublic: false,
      imageToBecome: undefined,
      originalImage: undefined,
    },
  });

  useFormPersist("generateForm", {
    watch: form.watch,
    setValue: form.setValue,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  });

  async function onSubmit(data: GenerateFields) {
    const result = await generate(data);

    if (result.success) {
      toast.success("Generated successfully");
      form.reset();
      router.push("/collection");
      return;
    }

    toast.error("Failed to generate");
  }

  const { isSubmitting } = form.formState;

  const getSubmitBtnText = () => {
    if (isSubmitting) {
      return (
        <>
          Generating...{" "}
          <span className="text-sm">(this may take a few seconds)</span>
        </>
      );
    }

    if (isUploading) {
      return "Uploading image...";
    }

    return "Generate";
  };

  const originalFileKey = form.watch("originalFileKey");
  const toBecomeFileKey = form.watch("toBecomeFileKey");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="originalImage"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel htmlFor="originalImage">Original image</FormLabel>
              <UploadDropzone
                inputId="originalImage"
                onUploadBegin={() => setIsUploading(true)}
                onClientUploadComplete={(res) => {
                  field.onChange(res[0].url);
                  form.setValue("originalFileKey", res[0].key);
                  setIsUploading(false);
                }}
                onUploadError={() => {
                  toast.error("Failed to upload original image");
                  setIsUploading(false);
                }}
              />
              <FormMessage />
              {originalFileKey && (
                <div className="pt-6">
                  <PreviewImage
                    alt="Original image"
                    urlName="originalImage"
                    keyName="originalFileKey"
                  />
                </div>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageToBecome"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel htmlFor="imageToBecome">Image to become</FormLabel>
              <UploadDropzone
                inputId="imageToBecome"
                onUploadBegin={() => setIsUploading(true)}
                onClientUploadComplete={(res) => {
                  field.onChange(res[0].url);
                  form.setValue("toBecomeFileKey", res[0].key);
                  setIsUploading(false);
                }}
                onUploadError={() => {
                  toast.error("Failed to upload image to become");
                  setIsUploading(false);
                }}
              />

              <FormMessage />
              {toBecomeFileKey && (
                <div className="pt-6">
                  <PreviewImage
                    alt="Image to become"
                    urlName="imageToBecome"
                    keyName="toBecomeFileKey"
                  />
                </div>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="mb-10">
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
        <FormField
          control={form.control}
          name="numOutputs"
          render={({ field }) => (
            <FormItem className="mb-10">
              <FormLabel>Number of images</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(+value)}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of outputs" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {numOuputValues
                    .filter((value) => value <= credits)
                    .map((value) => (
                      <SelectItem key={value} value={`${value}`}>
                        {value}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="mb-10 flex flex-row items-center space-x-4 space-y-0">
              <FormControl>
                <Checkbox
                  defaultChecked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Make results public</FormLabel>
            </FormItem>
          )}
        />
        <Button
          size="lg"
          className="w-full"
          disabled={isSubmitting || isUploading || credits === 0}
        >
          {getSubmitBtnText()}
        </Button>
      </form>
    </Form>
  );
}
