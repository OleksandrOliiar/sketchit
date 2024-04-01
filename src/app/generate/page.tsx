import { getUser } from "@/common/utils/auth";
import { redirect } from "next/navigation";
import { CreateSketchForm } from "./components";

export default async function Sketch() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="app-container pb-24 pt-32">
      <CreateSketchForm credits={user.credits} />
    </div>
  );
}
