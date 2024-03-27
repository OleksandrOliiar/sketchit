import { Button } from "@/ui";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import Link from "next/link";
import { getUser } from "@/common/utils/auth";
import { signout } from "@/app/actions";

export default async function Header() {
  const { user } = await getUser();

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-background py-6">
      <div className="app-container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <ModeToggle />
          {user ? (
            <>
              <Link href="/generate">
                <Button>Generate</Button>
              </Link>
              <form action={signout}>
                <Button variant="secondary">Sign out</Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button>Sign in</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button variant="secondary">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
