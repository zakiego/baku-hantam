import PageClientLeaderbord from "@/app/leaderboard/page-client";
import { groupByUsername } from "@/lib/utils";

export default async function Page() {
  const data = await groupByUsername();

  return <PageClientLeaderbord data={data} />;
}
