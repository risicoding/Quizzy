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
import { useSignInMutation } from "../query";
import { useRouter } from "next/router";

const SignInForm = () => {
  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const { mutate, data, status } = useSignInMutation();
  const mutationData = data as any;

  const onSubmit = async (data: signInSchemaType) => {
    console.log(data);
    mutate(data);
    console.log(mutationData);

    if (status === "error" && mutationData !== undefined) {
      return form.setError("email", {
        type: mutationData.error.code,
        message: mutationData.error.message,
      });
    }

    if (status === "success") {
      router.push("/");
    }
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
        <Button size="xs" className="mt-4 w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
