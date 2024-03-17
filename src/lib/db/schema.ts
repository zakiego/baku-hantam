import { text, pgTable } from "drizzle-orm/pg-core";

export const table = pgTable("table", {
  text: text("text"),
});
