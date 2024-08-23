import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center pb-48">
      <SignIn />
    </div>
  );
}
