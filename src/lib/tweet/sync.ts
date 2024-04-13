import * as fs from "node:fs";
import { z } from "zod";
import { getTweetId } from "@/lib/tweet/utils";
import { getTweet as reactTweetAPI } from "react-tweet/api";
import { dbClient, dbSchema } from "@/lib/db";
import { asc, desc } from "drizzle-orm";
import { createTweetUrl } from "@/lib/utils";

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

const sofSyncTweets = async () => {
  const data = fs.readFileSync("src/lib/tweet/data.json", "utf8");
  const debatesJSON = schema.parse(JSON.parse(data)).data.reverse();
  const debatesDB = await dbClient.query.tweet.findMany();

  for (const topic of debatesJSON) {
    const topicId = topic.slug;
    const topicTitle = topic.title;
    const topicDescription = topic.description;

    // -- INSERT TOPIC
    await dbClient
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
  }

  for (const tweetJSON of debatesJSON) {
    const topicId = tweetJSON.slug;

    const listTweetJsonNotInDB = tweetJSON.tweets.filter((tweetUrl) => {
      return debatesDB.every((tweetDB) => tweetDB.id !== getTweetId(tweetUrl));
    });

    for (const tweetUrl of listTweetJsonNotInDB) {
      const tweetId = getTweetId(tweetUrl);
      const resp = await reactTweetAPI(tweetId);

      if (!resp) {
        console.error(`Error: Tweet not found ${tweetUrl}`);
        return;
      }

      // -- INSERT USER
      await dbClient
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
      await dbClient
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

  // await dbClient.transaction(async (trx) => {
  //   // -- SET ALL TWEET SHOW TO FALSE
  //   await trx.update(dbSchema.tweet).set({ show: false });
  //   console.log("Status: All tweets set to show = false");

  //   // -- DELETE ALL TOPICS
  //   await trx.delete(dbSchema.topic);
  //   console.log("Status: All topics deleted");

  //   for (const topic of debates) {
  //     const topicId = topic.slug;
  //     const topicTitle = topic.title;
  //     const topicDescription = topic.description;

  //     // -- INSERT TOPIC
  //     await trx
  //       .insert(dbSchema.topic)
  //       .values({
  //         id: topicId,
  //         title: topicTitle,
  //         description: topicDescription,
  //       })
  //       .onConflictDoUpdate({
  //         target: dbSchema.topic.id,
  //         set: {
  //           id: topicId,
  //           title: topicTitle,
  //           description: topicDescription,
  //           updated_at: new Date(),
  //         },
  //       });
  //     console.log(`Status: Inserted topic ${topicTitle}`);

  //     for (const tweet of topic.tweets) {
  //       const tweetId = getTweetId(tweet);

  //       const resp = await reactTweetAPI(tweetId);

  //       if (!resp) {
  //         console.error(`Error: Tweet not found ${tweetId}`);
  //         return;
  //       }

  //       // -- INSERT USER
  //       await trx
  //         .insert(dbSchema.user)
  //         .values({
  //           id: resp.user.id_str,
  //           name: resp.user.name,
  //           screen_name: resp.user.screen_name,
  //           profile_image_url_https: resp.user.profile_image_url_https,
  //         })
  //         .onConflictDoUpdate({
  //           target: dbSchema.user.id,
  //           set: {
  //             name: resp.user.name,
  //             screen_name: resp.user.screen_name,
  //             profile_image_url_https: resp.user.profile_image_url_https,
  //             updated_at: new Date(),
  //           },
  //         });

  //       // -- INSERT TWEET
  //       await trx
  //         .insert(dbSchema.tweet)
  //         .values({
  //           id: tweetId,
  //           data: resp,
  //           user_id: resp.user.id_str,
  //           topic_id: topicId,
  //           show: true,
  //           created_at: new Date(resp.created_at),
  //           updated_at: new Date(),
  //         })
  //         .onConflictDoUpdate({
  //           target: dbSchema.tweet.id,
  //           set: {
  //             data: resp,
  //             user_id: resp.user.id_str,
  //             topic_id: topicId,
  //             created_at: new Date(resp.created_at),
  //             updated_at: new Date(),
  //             show: true,
  //           },
  //         });
  //       console.log(`Status: Inserted tweet ${tweetId}`);
  //     }
  //   }
  // });

  process.exit(0);
};

const hardSyncTweets = async () => {
  const data = await dbClient.query.tweet.findMany({
    orderBy: asc(dbSchema.tweet.updated_at),
    limit: 10,
    with: {
      user: true,
    },
  });

  for (const tweet of data) {
    const tweetId = tweet.id;

    const resp = await reactTweetAPI(tweetId);

    if (!resp) {
      console.error(
        `Error: Tweet not found ${createTweetUrl(
          tweet.user.screen_name as string,
          tweet.id,
        )}`,
      );
      continue;
    }

    // -- INSERT USER
    await dbClient
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
    await dbClient
      .insert(dbSchema.tweet)
      .values({
        id: tweetId,
        data: resp,
        user_id: resp.user.id_str,
        topic_id: tweet.topic_id,
        show: true,
        created_at: new Date(resp.created_at),
        updated_at: new Date(),
      })
      .onConflictDoUpdate({
        target: dbSchema.tweet.id,
        set: {
          data: resp,
          user_id: resp.user.id_str,
          topic_id: tweet.topic_id,
          created_at: new Date(resp.created_at),
          updated_at: new Date(),
          show: true,
        },
      });

    console.log(
      `Status: Updated tweet ${tweetId} - @${tweet.user.screen_name}`,
    );
  }
};

const syncUsers = async () => {
  const users = await dbClient.query.user.findMany({
    with: {
      tweet: true,
    },
    orderBy: asc(dbSchema.user.updated_at),
  });

  for (const user of users) {
    const tweetId = user.tweet[0].id;

    console.log(`Status: Updating user ${user.name} - @${user.screen_name}`);

    const resp = await reactTweetAPI(tweetId);

    if (!resp) {
      console.error(
        `Error: Tweet not found ${createTweetUrl(
          user.screen_name as string,
          tweetId,
        )}`,
      );
      continue;
    }

    // -- INSERT USER
    await dbClient
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

    console.log(
      `Status: Updated user ${resp.user.name} - @${resp.user.screen_name}`,
    );
  }
};

const main = async () => {
  // get args from command line
  type Args = "tweets" | "hard-tweets" | "users";

  const arg = process.argv[2] as Args;

  switch (arg) {
    case "tweets":
      await sofSyncTweets();
      break;
    case "users":
      await syncUsers();
      break;
    case "hard-tweets":
      await hardSyncTweets();
      break;
    default:
      console.error("Error: Invalid argument");
      console.log("Usage: pnpm sync <tweets|hard-tweets|users>");
      process.exit(1);
  }

  process.exit(0);
};

main();
