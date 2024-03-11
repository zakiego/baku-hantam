import { ENV } from "@/lib/env";
import { Redis } from "ioredis";

const redisDev = new Redis();

const redisProd = new Redis({
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
  // password: ENV.REDIS_PASSWORD,
});

export const redis = ENV.NODE_ENV === "production" ? redisProd : redisDev;
