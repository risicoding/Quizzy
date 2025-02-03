import SignIn from "@/features/auth/sign-in/components/sign-in";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};

export default Page;
