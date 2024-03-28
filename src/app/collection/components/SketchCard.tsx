import Image from "next/image";
import Link from "next/link";
import DeleteSketchButton from "./DeleteSketchButton";
import ToggleVisibilityButton from "./ToggleVisibilityButton";

type Props = {
  id: string;
  prompt: string;
  results: string[];
  createdAt: Date;
  isPublic: boolean;
};

export default function SketchCard({
  id,
  createdAt,
  prompt,
  results,
  isPublic,
}: Props) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3>
          {prompt}{" "}
          <span className="ml-2 text-sm text-muted-foreground">
            ({new Date(createdAt).toLocaleString()})
          </span>
        </h3>
        <div className="flex items-center gap-3">
          <ToggleVisibilityButton sketchId={id} isPublic={isPublic} />
          <DeleteSketchButton sketchId={id} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {results.map((result, index) => (
          <Link href={result} target="_blank">
            <div key={index} className="relative aspect-[1/1] overflow-hidden">
              <Image
                src={result}
                alt={prompt}
                fill
                className="absolute left-0 top-0 h-full w-full rounded-md object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
