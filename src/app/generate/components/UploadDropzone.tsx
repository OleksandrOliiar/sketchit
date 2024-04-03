import { useDropzone } from "@uploadthing/react";
import { MouseEventHandler, useCallback, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "../utils";
import { ClientUploadedFileData } from "uploadthing/types";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";
import { Button } from "@/ui";

type Props = {
  onClientUploadComplete?:
    | ((
        res: ClientUploadedFileData<{
          uploadedBy: string;
        }>[],
      ) => void)
    | undefined;
  onUploadError?: ((e: UploadThingError<Json>) => void) | undefined;
  onUploadBegin?: ((fileName: string) => void) | undefined;
  inputId: string;
};

export default function UploadDropzone({
  inputId,
  onClientUploadComplete,
  onUploadBegin,
  onUploadError,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete,
      onUploadError,
      onUploadBegin,
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    multiple: false,
  });

  const handleUpload: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    startUpload(files);
    setFiles([]);
  };

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center rounded-md border-2 border-dashed border-secondary py-16"
    >
      <input {...getInputProps()} id={inputId} />
      <div className="flex flex-col items-center space-y-4">
        <UploadIcon />
        <div className="space-y-1 text-center">
          <p className="text-sm font-semibold text-primary">
            Choose files or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">{fileTypes}</p>
        </div>
        <Button
          onClick={handleUpload}
          disabled={files.length <= 0 || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload file"}
        </Button>
      </div>
    </div>
  );
}

const UploadIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="h-12 w-12 align-middle text-muted-foreground"
      data-ut-element="upload-icon"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};
