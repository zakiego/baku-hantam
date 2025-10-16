import PageClientLeaderbord from "@/app/leaderboard/page-client";
import { restClient } from "@/lib/api/client";
import { REVALIDATE_TIME } from "@/lib/const";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 300;

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

  return (
    <PageClientLeaderbord
      datav2={leaderboardResp.body}
      stats={statsResp.body.data}
    />
  );
}
