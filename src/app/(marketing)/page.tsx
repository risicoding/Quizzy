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
      router.refresh();
      return res;
    },
  });

  return (
    <div className="flex-col min-h-screen gap-4 items-center justify-center">
      {!data?.data ? (
        <Button
          onClick={async () => {
            const res = await authClient.signIn.email({
              email: "risi@example.com",
              password: "risipassword",
            });
            console.log(res);
          }}
        >
          signin
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await authClient.signOut();
            router.refresh();
          }}
        >
          signout
        </Button>
      )}
      {JSON.stringify(data)}
      <Image src={'/logo.svg'} width={300} height={400} alt='logo'/>
    </div>
  );
};

export default Page;
