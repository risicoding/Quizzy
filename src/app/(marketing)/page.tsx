"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["getsession"],
    queryFn: async () => {
      const res = await authClient.getSession();
      console.log(res);
      router.push("/");
      return res;
    },
  });

  return (
    <div className="min-h-screen items-center justify-center gap-4 p-24">
      {!data?.data ? (
        <Button
          onClick={async () => {
            router.push("/sign-in");
          }}
        >
          signin
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await authClient.signOut();
            router.push("/");
          }}
        >
          signout
        </Button>
      )}
      <p className="mt-5">{JSON.stringify(data)}</p>
    </div>
  );
};

export default Page;
