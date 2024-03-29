import { Suspense } from "react";
import { Sketches } from "./components";
import Link from "next/link";
import { Button } from "@/ui";

export default function Community() {
  return (
    <div className="app-container pb-24 pt-32">
      <h1 className="mb-10">Community generated images</h1>
      <div className="mb-10">
        <Suspense fallback="loading">
          <Sketches />
        </Suspense>
      </div>
      <p className="text-center">
        <Link href="/generate">
          <Button variant="link" className="text-base">generate your own images</Button>
        </Link>
      </p>
    </div>
  );
}
