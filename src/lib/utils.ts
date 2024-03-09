export const getTweetId = (tweet: string) => {
  const tweetId = tweet.split("/").pop();

  if (!tweetId) {
    throw new Error("Invalid tweet URL");
  }

  return tweetId;
};
