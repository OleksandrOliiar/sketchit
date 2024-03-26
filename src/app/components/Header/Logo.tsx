import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h2 className="font-bold">
        Sketch<span className="text-primary">IT</span>
      </h2>
    </Link>
  );
}
