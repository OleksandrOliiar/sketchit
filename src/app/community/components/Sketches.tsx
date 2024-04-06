import { Fragment } from "react";
import { getPublicSketches } from "../actions";
import Image from "next/image";

export default async function Sketches() {
  const sketches = await getPublicSketches();

  if (!sketches.length) {
    return (
      <p className="text-center text-muted-foreground">No results found</p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {sketches.map(({ id, results, prompt }) => (
        <Fragment key={id}>
          {results.map((result, index) => (
            <div key={index} className="relative aspect-[1/1] overflow-hidden">
              <Image
                src={result}
                alt={prompt}
                fill
                className="absolute left-0 top-0 h-full w-full rounded-md object-cover"
              />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
