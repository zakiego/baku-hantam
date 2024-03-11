import { debates } from "@/lib/tweets";

export const getTweetId = (tweet: string) => {
  const tweetId = tweet.split("/").pop();

  if (!tweetId) {
    throw new Error("Invalid tweet URL");
  }

  return tweetId;
};

export const getTweetWithCache = async (id: string) => {
  const response = await fetch(
    `https://baku-hantam.vercel.app/api/tweet/${id}`,
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export const checkDuplicateTweets = () => {
  const duplicateTweets = debates
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
