import { z } from "zod";
import dotnev from "dotenv";

dotnev.config();

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string().min(5),
});

export const ENV = schema.parse(process.env);
