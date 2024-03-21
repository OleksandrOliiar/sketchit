import { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-20">
      {children}
    </div>
  );
}
