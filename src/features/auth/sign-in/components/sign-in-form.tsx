"use client";

import { useForm } from "react-hook-form";
import { signInSchema, signInSchemaType } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useSignInMutation } from "../query";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "../../client";

const SignInForm = ({ redirectUrl }: { redirectUrl?: string }) => {
  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: signInSchemaType) => {
    console.log("Form data", data);
    const res = await authClient.signIn.email(data);
    console.log("res", res);

    if (res.error) {
      console.log(res.error);
      form.setError("email", {
        type: res.error.code,
        message: res.error.message,
      });
      return form.setError("password", {
        type: res.error.code,
        message: res.error.message,
      });
    }

    router.push(redirectUrl || "/");
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-[4px]">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4 h-8 w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            "Button"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
