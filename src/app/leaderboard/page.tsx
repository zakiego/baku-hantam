import PageClientLeaderbord from "@/app/leaderboard/page-client";
import { tweetQuery } from "@/lib/tweet/query";

export const dynamic = "force-static";

export default async function Page() {
  const data = await tweetQuery.leaderBoard();

  return <PageClientLeaderbord data={data} />;
}
