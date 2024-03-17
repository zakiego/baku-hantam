import { z } from "zod";
import dotnev from "dotenv";

dotnev.config();

const schema = z.object({
  REDIS_PORT: z.coerce.number().optional(),
  REDIS_HOST: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string().min(5),
});

export const ENV = schema.parse(process.env);
