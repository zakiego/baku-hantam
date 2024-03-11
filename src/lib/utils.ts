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
