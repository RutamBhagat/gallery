"use client";

import { Loader2, Upload } from "lucide-react"; // Importing icons from lucide-react

import { cn } from "~/lib/utils";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "~/lib/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

let loadingToastId: string | number;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    loadingToastId = toast(
      <div className="flex items-center">
        <Loader2 className="mr-2 animate-spin" />
        <span>Uploading...</span>
      </div>,
      {
        description: "Your files are being uploaded. Please wait.",
      },
    ); // Show loading toast with a spinner and description

    try {
      const result = await $ut.startUpload(selectedFiles);
      console.log("uploaded files", result);
      toast.success("Upload successful!", {
        id: loadingToastId,
        description: "Your files have been uploaded successfully.",
        action: {
          label: "View",
          onClick: () => console.log("View uploaded files"),
        },
      }); // Update to success message with description and action
    } catch (error) {
      console.error("Error uploading files", error);
      toast.error("Upload failed!", {
        id: loadingToastId,
        description:
          "There was an error uploading your files. Please try again.",
        action: {
          label: "Retry",
          onClick: () => console.log("Retry upload"),
        },
      }); // Update to error message with description and action
    }
  };

  // Assuming the key for image configuration is 'image'
  const maxFileCount = $ut.routeConfig?.image?.maxFileCount ?? 1;

  return {
    inputProps: {
      onChange,
      multiple: maxFileCount > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function SimpleUploadButton({ className }: { className?: string }) {
  const router = useRouter();
  const posthog = usePostHog();

  const { inputProps, isUploading } = useUploadThingInputProps(
    "imageUploader",
    {
      onUploadBegin() {
        posthog.capture(`${loadingToastId}`);
      },
      onUploadError(error) {
        posthog.capture("upload_error", { error });
        toast.error("Upload failed!", {
          id: loadingToastId,
          description:
            "There was an error uploading your files. Please try again.",
          action: {
            label: "Retry",
            onClick: () => console.log("Retry upload"),
          },
        });
      },
      onClientUploadComplete() {
        router.refresh();
      },
    },
  );

  return (
    <>
      <label
        htmlFor="upload-button"
        className={cn(
          className,
          "group inline-flex cursor-pointer items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50",
        )}
      >
        {isUploading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Upload className="h-6 w-6" />
        )}
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </>
  );
}
