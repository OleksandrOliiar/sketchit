import { Button } from "@/ui";
import ModeToggle from "./ModeToggle";
import Link from "next/link";
import { getUser } from "@/common/utils/auth";
import { signout } from "@/app/actions";

export default async function Header() {
  const { user } = await getUser();

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-background py-6">
      <div className="app-container flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link
            href="/community"
            className="font-semibold transition-colors hover:text-primary"
          >
            Community
          </Link>
          <Link
            href="/generate"
            className="font-semibold transition-colors hover:text-primary"
          >
            Generate
          </Link>
          {user && (
            <Link
              href="/collection"
              className="font-semibold transition-colors hover:text-primary"
            >
              Collection
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="mr-2">({user.credits} credits)</span>
              <Link href="/#buy_credits">
                <Button>Buy credits</Button>
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
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
