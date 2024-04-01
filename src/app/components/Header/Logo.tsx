import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h2 className="font-bold">
        B<span className="text-primary">Img</span>
      </h2>
    </Link>
  );
}
