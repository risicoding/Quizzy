"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "./sign-in-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "../../client";

const SignIn = () => {
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
          <CardTitle className="text-lg">Welcome back</CardTitle>
          <CardDescription className="text-[12px]">
            Login with your google or github account
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
                <span className="text-[13px]">Login with GitHub</span>
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
          <SignInForm redirectUrl={redirectUrl ? redirectUrl : "/"} />
        </CardContent>
        <CardFooter>
          <Link
            href={`/sign-up?redirect_url=${redirectUrl}`}
            className="w-full"
          >
            <h4 className="w-full text-center text-xs">
              Dont have an account ? <span className="underline">Sign Up</span>
            </h4>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
