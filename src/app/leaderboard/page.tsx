import PageClientLeaderbord from "@/app/leaderboard/page-client";
import { restClient } from "@/lib/api/client";
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
  const leaderboardResp = await restClient.getLeaderboard();
  const statsResp = await restClient.getStats();

  if (leaderboardResp.status !== 200 || statsResp.status !== 200) {
    throw new Error("Failed to fetch leaderboard data");
  }

  const { data: stats } = statsResp.body;
  const { data } = leaderboardResp.body;

  return <PageClientLeaderbord data={data} stats={stats} />;
}
