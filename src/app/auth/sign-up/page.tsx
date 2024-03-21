import { GithubButton } from "../components";
import { SignupForm } from "./components";

export default function SignUp() {
  return (
    <div className="w-full max-w-[400px] space-y-10">
      <h3 className="text-center">Create an account</h3>
      <div>
        <SignupForm />
        <GithubButton />
      </div>
    </div>
  );
}
