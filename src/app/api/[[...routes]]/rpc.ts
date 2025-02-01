import { app } from "./app";
import { hc } from "hono/client";

// this is a trick to calculate the type when compiling
export const client = hc<typeof app>("");
export type Client = typeof client;

export const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args);
