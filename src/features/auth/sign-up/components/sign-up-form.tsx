"use client";

import { useForm } from "react-hook-form";
import { signUpSchemaType, signUpSchema } from "../schema";
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
import { useSignUpMutation } from "../query";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, data, status } = useSignUpMutation();

  const mutationData = data as any;

  const router = useRouter();

  const onSubmit = async (data: signUpSchemaType) => {
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
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-[4px]">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            <FormItem className="space-y-[4px]">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 w-full h-8" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
