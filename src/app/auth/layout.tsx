import { getUser } from "@/common/utils/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  const { user } = await getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center py-20">
      {children}
    </div>
  );
}
