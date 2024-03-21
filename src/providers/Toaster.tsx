import { Toaster as ToasterUI } from "@/ui";
import { CheckIcon } from "@radix-ui/react-icons";

export default function Toaster() {
  return (
    <ToasterUI
      icons={{
        success: (
          <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary">
            <CheckIcon className="h-5 w-5 text-[#f8f8f7]" />
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          title: "ml-4 text-base !font-normal",
        },
        duration: 2000,
        className: "!duration-200 !py-5",
      }}
    />
  );
}
