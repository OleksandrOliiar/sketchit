import { getUser } from "@/common/utils/auth";
import { redirect } from "next/navigation";
import { getUserSketches } from "./actions";
import { SketchCard } from "./components";

export default async function Collection() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const userSketches = await getUserSketches(user.id);

  return (
    <div className="app-container pb-24 pt-32">
      <div>
        {userSketches.map(({ id, results, prompt, ...data }) => (
          <SketchCard
            key={id}
            id={id}
            prompt={prompt ?? ""}
            results={results ?? []}
            {...data}
          />
        ))}
      </div>
    </div>
  );
}
