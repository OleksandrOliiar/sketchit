import { getUser } from "@/common/utils/auth";
import { redirect } from "next/navigation";
import { getUserSketches } from "../actions";
import SketchCard from "./SketchCard";

type Props = {
  prompt: string;
};

export default async function Sketches({ prompt }: Props) {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const userSketches = await getUserSketches({ prompt, userId: user.id });

  return (
    <div className="flex flex-col gap-10">
      {userSketches.map(({ id, ...data }) => (
        <SketchCard
          key={id}
          id={id}
          {...data}
        />
      ))}
    </div>
  );
}
