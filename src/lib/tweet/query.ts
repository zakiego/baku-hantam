import { dbClient, dbSchema } from "@/lib/db";
import { asc, desc, eq } from "drizzle-orm";

const home = async () => {
  const users = await dbClient.query.user.findMany();
  const topics = await dbClient.query.topic.findMany();
  const tweets = await dbClient.query.tweet.findMany({
    where: eq(dbSchema.tweet.show, true),
    orderBy: asc(dbSchema.tweet.created_at),
  });

  // join users and tweets to topics
  const data = topics.map((topic) => {
    const tweetsThisTopic = tweets.filter(
      (tweet) => tweet.topic_id === topic.id,
    );

    return {
      topic: topic,
      tweets: tweetsThisTopic,
      users: tweetsThisTopic
        .map((tweet) => {
          return users.find((user) => user.id === tweet.user_id);
        })
        // filter duplicate
        .filter(
          (value, index, self) => self.indexOf(value) === index,
        ) as typeof users,
    };
  });

  const sortByMostTweets = data.sort((a, b) => {
    return b.tweets.length - a.tweets.length;
  });

  return sortByMostTweets;
};

const topicList = async () => {
  const topics = await dbClient.query.topic.findMany();
  return topics;
};

const tweetsByTopic = async (topicId: string) => {
  const tweets = await dbClient.query.tweet.findMany({
    where: eq(dbSchema.tweet.topic_id, topicId),
    orderBy: asc(dbSchema.tweet.created_at),
  });

  return tweets;
};

const topicDetail = async (topicId: string) => {
  const topic = await dbClient.query.topic.findFirst({
    where: eq(dbSchema.topic.id, topicId),
  });

  return topic;
};

const leaderBoard = async () => {
  const users = await dbClient.query.user.findMany();
  const tweets = await dbClient.query.tweet.findMany({
    where: eq(dbSchema.tweet.show, true),
    orderBy: asc(dbSchema.tweet.created_at),
  });

  const data = users.map((user) => {
    const tweetsThisUser = tweets.filter((tweet) => tweet.user_id === user.id);

    return {
      profile: user,
      tweets: tweetsThisUser,
    };
  });

  const sortByMostTweets = data.sort((a, b) => {
    return b.tweets.length - a.tweets.length;
  });

  type UserWithRank = (typeof sortByMostTweets)[0] & { rank: number };

  // add rank by tweets length
  // if the number of tweets is the same, the rank is the same
  const addRank = sortByMostTweets.map((item, index) => {
    const previousUser = sortByMostTweets[index - 1] as UserWithRank;
    const user = item as UserWithRank;

    if (previousUser && previousUser.tweets.length === user.tweets.length) {
      user.rank = previousUser.rank;
    } else {
      user.rank = index + 1;
    }

    return user;
  });

  return addRank;
};

const leaderBoardByUser = async (username: string) => {
  const user = await dbClient.query.user.findFirst({
    where: eq(dbSchema.user.screen_name, username),
  });

  if (!user) {
    return null;
  }

  const tweets = await dbClient.query.tweet.findMany({
    where: eq(dbSchema.tweet.user_id, user.id),
    orderBy: asc(dbSchema.tweet.created_at),
  });

  return {
    profile: user,
    tweets,
  };
};

const userList = async () => {
  const users = await dbClient.query.user.findMany();
  return users;
};

export const tweetQuery = {
  home,
  topicDetail,
  topicList,
  tweetsByTopic,
  leaderBoard,
  leaderBoardByUser,
  userList,
};
