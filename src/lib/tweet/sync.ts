import * as fs from "node:fs";
import { z } from "zod";
import { getTweetId } from "@/lib/tweet/utils";
import { getTweet as reactTweetAPI } from "react-tweet/api";
import { dbClient, dbSchema } from "@/lib/db";

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

const syncTweets = async () => {
  const data = fs.readFileSync("src/lib/tweet/data.json", "utf8");
  const debates = schema.parse(JSON.parse(data)).data;

  await dbClient.transaction(async (trx) => {
    // -- SET ALL TWEET SHOW TO FALSE
    await trx.update(dbSchema.tweet).set({ show: false });
    console.log("Status: All tweets set to show = false");

    // -- DELETE ALL TOPICS
    await trx.delete(dbSchema.topic);
    console.log("Status: All topics deleted");

    for (const topic of debates) {
      const topicId = topic.slug;
      const topicTitle = topic.title;
      const topicDescription = topic.description;

      // -- INSERT TOPIC
      await trx
        .insert(dbSchema.topic)
        .values({
          id: topicId,
          title: topicTitle,
          description: topicDescription,
        })
        .onConflictDoUpdate({
          target: dbSchema.topic.id,
          set: {
            id: topicId,
            title: topicTitle,
            description: topicDescription,
            updated_at: new Date(),
          },
        });
      console.log(`Status: Inserted topic ${topicTitle}`);

      for (const tweet of topic.tweets) {
        const tweetId = getTweetId(tweet);

        const resp = await reactTweetAPI(tweetId);

        if (!resp) {
          console.error(`Error: Tweet not found ${tweetId}`);
          return;
        }

        // -- INSERT USER
        await trx
          .insert(dbSchema.user)
          .values({
            id: resp.user.id_str,
            name: resp.user.name,
            screen_name: resp.user.screen_name,
            profile_image_url_https: resp.user.profile_image_url_https,
          })
          .onConflictDoUpdate({
            target: dbSchema.user.id,
            set: {
              name: resp.user.name,
              screen_name: resp.user.screen_name,
              profile_image_url_https: resp.user.profile_image_url_https,
              updated_at: new Date(),
            },
          });

        // -- INSERT TWEET
        await trx
          .insert(dbSchema.tweet)
          .values({
            id: tweetId,
            data: resp,
            user_id: resp.user.id_str,
            topic_id: topicId,
            show: true,
            created_at: new Date(resp.created_at),
            updated_at: new Date(),
          })
          .onConflictDoUpdate({
            target: dbSchema.tweet.id,
            set: {
              data: resp,
              user_id: resp.user.id_str,
              topic_id: topicId,
              created_at: new Date(resp.created_at),
              updated_at: new Date(),
              show: true,
            },
          });
        console.log(`Status: Inserted tweet ${tweetId}`);
      }
    }
  });

  process.exit(0);
};

syncTweets();
