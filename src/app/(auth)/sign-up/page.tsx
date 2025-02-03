import SignUp from "@/features/auth/sign-up/components/sign-up";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
};

export default Page;
