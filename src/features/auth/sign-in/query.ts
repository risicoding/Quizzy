import { useMutation } from "@tanstack/react-query";
import { signInSchemaType } from "./schema";
import { authClient } from "../client";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (data: signInSchemaType):Promise<any> => {
      const res = await authClient.signIn.email(data);
      console.log(res);
      if (res.error) {
        return { error: { code: res.error.code, message: res.error.message } };
      }

      return res;
    },
  });
};
