import { dbClient, dbSchema } from "@/lib/db";
import { getTweet as reactTweetAPI } from "react-tweet/api";

export const getTweetId = (tweet: string) => {
  const tweetId = tweet.split("/").pop();

  if (!tweetId) {
    throw new Error("Invalid tweet URL");
  }

  return tweetId;
};

export const fetchTweetToDatabase = async (tweetId: string) => {
  console.log("Fetching tweet", tweetId);

  const data = await reactTweetAPI(tweetId);

  if (!data) {
    console.error("Tweet not found", tweetId);
    return;
  }

  await dbClient.transaction(async (trx) => {
    await trx
      .insert(dbSchema.user)
      .values({
        id: data.user.id_str,
        name: data.user.name,
        screen_name: data.user.screen_name,
        profile_image_url_https: data.user.profile_image_url_https,
      })
      .onConflictDoUpdate({
        target: dbSchema.user.id,
        set: {
          name: data.user.name,
          screen_name: data.user.screen_name,
          profile_image_url_https: data.user.profile_image_url_https,
        },
      });

    await trx
      .insert(dbSchema.tweet)
      .values({
        id: tweetId,
        data,
        user_id: data.user.id_str,
      })
      .onConflictDoUpdate({
        target: dbSchema.tweet.id,
        set: {
          data,
          user_id: data.user.id_str,
        },
      });
  });
};
