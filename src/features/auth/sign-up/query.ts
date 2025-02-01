import { useMutation } from "@tanstack/react-query";
import { signUpSchemaType } from "./schema";
import { authClient } from "../client";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (data: signUpSchemaType) => {
      const res = await authClient.signUp.email(data);
      console.log(res);
      if (res.error) {
        return { error: { code: res.error.code, message: res.error.message } };
      }
      return res
    },
  });
};
