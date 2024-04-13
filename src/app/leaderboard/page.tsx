import PageClientLeaderbord from "@/app/leaderboard/page-client";
import { dbClient, dbSchema } from "@/lib/db";
import { tweetQuery } from "@/lib/tweet/query";
import { count } from "drizzle-orm";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Leaderboard Debat Tech Twitter Indonesia",
  keywords: "debat, tech, twitter, indonesia, leaderboard",
};

export default async function Page() {
  const data = await tweetQuery.leaderBoard();

  const usersCount = await dbClient
    .select({ count: count() })
    .from(dbSchema.user);

  const topicsCount = await dbClient
    .select({ count: count() })
    .from(dbSchema.topic);

  const tweetsCount = await dbClient
    .select({ count: count() })
    .from(dbSchema.tweet);

  const stats = {
    users: usersCount[0].count,
    topics: topicsCount[0].count,
    tweets: tweetsCount[0].count,
  };

  return <PageClientLeaderbord data={data} stats={stats} />;
}
