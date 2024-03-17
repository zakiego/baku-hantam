import { relations } from "drizzle-orm";
import { text, pgTable, json, timestamp, boolean } from "drizzle-orm/pg-core";

export const tweet = pgTable("tweet", {
  id: text("id").primaryKey(),

  created_at: timestamp("created_at").notNull(),
  data: json("data").notNull(),

  topic_id: text("topic").notNull(),
  user_id: text("user_id").notNull(),

  show: boolean("show"),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const user = pgTable("user", {
  id: text("id_str").primaryKey(),
  name: text("name"),
  screen_name: text("screen_name"),
  profile_image_url_https: text("profile_image_url_https"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const topic = pgTable("topic", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => ({
  tweet: many(tweet),
}));

export const tweetRelations = relations(tweet, ({ one }) => ({
  user: one(user, {
    fields: [tweet.user_id],
    references: [user.id],
  }),

  topic: one(topic, {
    fields: [tweet.topic_id],
    references: [topic.id],
  }),
}));

export const topicRelations = relations(topic, ({ many }) => ({
  tweet: many(tweet),
}));
