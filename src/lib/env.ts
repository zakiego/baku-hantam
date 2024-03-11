import { z } from "zod";

const schema = z.object({
  REDIS_PORT: z.coerce.number().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]),
});

export const ENV = schema.parse(process.env);
