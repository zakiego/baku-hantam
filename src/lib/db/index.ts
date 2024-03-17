import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ENV } from "@/lib/env";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

export const dbClient = drizzle(pool);
