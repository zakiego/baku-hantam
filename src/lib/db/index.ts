import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ENV } from "@/lib/env";
import {
  topic,
  tweet,
  user,
  topicRelations,
  tweetRelations,
  userRelations,
} from "@/lib/db/schema";

const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
});

export const dbSchema = {
  tweet,
  user,
  topic,
  topicRelations,
  tweetRelations,
  userRelations,
};

export const dbClient = drizzle(pool, {
  schema: dbSchema,
});
