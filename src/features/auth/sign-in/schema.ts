import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type signInSchemaType = z.infer<typeof signInSchema>;
