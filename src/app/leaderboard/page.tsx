import PageClientLeaderbord from "@/app/leaderboard/page-client";
import { tweetQuery } from "@/lib/tweet/query";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Leaderboard Debat Tech Twitter Indonesia",
  keywords: "debat, tech, twitter, indonesia, leaderboard",
};

export default async function Page() {
  const data = await tweetQuery.leaderBoard();

  return <PageClientLeaderbord data={data} />;
}
