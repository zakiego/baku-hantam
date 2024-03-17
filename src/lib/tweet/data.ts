import * as fs from "node:fs";

import { z } from "zod";
import onChange from "on-change";

const schema = z.object({
  data: z.array(
    z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      tweets: z.array(z.string()).min(1),
    }),
  ),
});

export const getTweetData = () => {
  const data = fs.readFileSync("src/lib/tweet/data.json", "utf8");

  const tweets = schema.parse(JSON.parse(data));

  return tweets.data;
};

export const checkDuplicateTweets = async () => {
  const duplicateTweets = await getTweetData()
    .flatMap((d) => {
      return d.tweets.map((t) => t);
    })
    .filter((value, index, self) => {
      return self.indexOf(value) !== index;
    });

  if (duplicateTweets.length > 0) {
    console.error("Duplicate tweets", duplicateTweets);
  }
};
