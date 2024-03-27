import { Suspense } from "react";
import { Sketches, SearchInput } from "./components";

type Props = {
  searchParams: {
    search: string | string[] | undefined;
  };
};

export default async function Collection({ searchParams: { search } }: Props) {
  const prompt = search ? (Array.isArray(search) ? search[0] : search) : "";

  return (
    <div className="app-container pb-24 pt-32">
      <h1 className="mb-5">Collection</h1>
      <div className="mb-10">
        <SearchInput />
      </div>
      <Suspense fallback={"loading"}>
        <Sketches prompt={prompt} />
      </Suspense>
    </div>
  );
}
