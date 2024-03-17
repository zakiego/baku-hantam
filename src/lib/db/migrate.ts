import { ENV } from "@/lib/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";

const migrateDb = async () => {
  console.log("Migrating database...");

  console.log(ENV.DATABASE_URL);

  const client = new Client({
    connectionString: ENV.DATABASE_URL,
  });

  client.connect();

  const dbClient = drizzle(client);

  await migrate(dbClient, { migrationsFolder: "./src/lib/db/migrations" });

  console.log("Database migrated successfully");
};

migrateDb().then(() => {
  process.exit(0);
});
