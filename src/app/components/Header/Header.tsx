import { Button } from "@/ui";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="container fixed left-0 top-0 w-full bg-background py-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href="/auth/sign-in">
            <Button>Sign in</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button variant="secondary">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
