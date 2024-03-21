import { GithubButton, SigninForm } from "../components";

export default function SignUp() {
  return (
    <div className="w-full max-w-[400px] space-y-10">
      <h3 className="text-center">Enter your account</h3>
      <div>
        <SigninForm />
        <GithubButton />
      </div>
    </div>
  );
}
