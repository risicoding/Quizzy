"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignUpForm from "./sign-up-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "../../client";

const SignUp = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-center gap-2">
        <Image src={"/logo.svg"} width={20} height={20} alt="brand-logo" />
        <h3 className="font-semibold">Quizzy</h3>
      </div>

      <Card className="shadow-md">
        <CardHeader className="flex-col justify-center text-center">
          <CardTitle className="text-lg">Welcome</CardTitle>
          <CardDescription className="text-[12px]">
            Signup with your google or github account
          </CardDescription>
          <div>
            <div className="flex flex-col items-center space-y-2 py-4 text-xs">
              <Button
                variant="outline"
                size="xs"
                className="flex w-64 items-center space-x-1"
                onClick={async () => {
                  const res = await authClient.signIn.social({
                    provider: "github",
                    callbackURL: redirectUrl ?? "/",
                  });
                  console.log(res);
                }}
              >
                <FaGithub className="h-5 w-5" />
                <span className="text-[13px]">Signup with GitHub</span>
              </Button>
            </div>
          </div>
          {/* Separator */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex-1 border-t border-gray-300" />
            <span>Or continue with</span>
            <span className="flex-1 border-t border-gray-300" />
          </div>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <Link href={`/sign-in?redirect_url=${redirectUrl}`} className="">
            <h4 className="w-full text-center text-xs">
              Already have an account ?{" "}
              <span className="underline">Sign In</span>
            </h4>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
