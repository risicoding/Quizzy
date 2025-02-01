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
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="space-y-4">
      <div className="flex w-full gap-2 items-center justify-center">
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
            <div className="flex flex-col items-center text-xs space-y-2 py-4">
              <Button
                variant="outline"
                size="xs"
                className="flex items-center space-x-1 w-full py-1"
              >
                <FaGoogle className="w-5 h-5" />
                <span className="text-[13px] leading-5">
                  Signup with Google
                </span>
              </Button>
              <Button
                variant="outline"
                size="xs"
                className="flex items-center space-x-1 w-64"
              >
                <FaGithub className="w-5 h-5" />
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
          <Link href='/sign0in' className=''>
          <h4 className="text-xs text-center w-full">
          Already have an account ? <span className="underline">Sign In</span>
          </h4>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
