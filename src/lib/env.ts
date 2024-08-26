import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const ENV = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    DATABASE_URL: z.string().min(5),
    API_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.DATABASE_URL,
    DATABASE_URL: process.env.OPEN_AI_API_KEY,
    API_URL: process.env.API_URL,
  },
});
