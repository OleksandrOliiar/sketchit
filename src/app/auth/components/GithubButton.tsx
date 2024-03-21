import { Button } from "@/ui";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function GithubButton() {
  return (
    <>
      <div className="relative py-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="secondary" className="w-full">
        <GitHubLogoIcon className="mr-2 h-4 w-4" /> Github
      </Button>
    </>
  );
}
