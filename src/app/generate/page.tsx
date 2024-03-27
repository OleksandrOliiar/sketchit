import { getUser } from "@/common/utils/auth";
import { redirect } from "next/navigation";
import { CreateSketchForm } from "./components";

export default async function Sketch() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="app-container pt-32 pb-24">
      <CreateSketchForm />
    </div>
  );
}
