import { getUser } from "@/common/utils/auth";
import { redirect } from "next/navigation";
import { GenerateImageForm } from "./components";
import { Button } from "@/ui";

export default async function Sketch() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  if (user.credits === 0) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
        <h3>You don&apos;t have enough credits</h3>
        <Button variant="link" size="lg">
          Click here to buy
        </Button>
      </div>
    );
  }

  return (
    <div className="app-container flex justify-center pb-24 pt-48">
      <div className="w-full max-w-[600px]">
        <h3 className="mb-14 text-center">Generate Image</h3>
        <GenerateImageForm credits={user.credits} />
      </div>
    </div>
  );
}
