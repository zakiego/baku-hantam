import type { getLeaderboardSchema } from "@/lib/api/contract";
import type { tweetQuery } from "@/lib/tweet/query";
import Link from "next/link";
import type { z } from "zod";

interface Props {
  user: z.infer<typeof getLeaderboardSchema>["data"][number];
}

export const CardLeaderboard = (props: Props) => {
  const { user } = props;

  return (
    <Link href={`/leaderboard/${user.tweetUserScreenName}`}>
      <div
        key={user.tweetUserScreenName}
        className="px-4 py-6 my-4 bg-white border-b border-b-slate-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-md text-slate-600 mr-3 font-bold">
              {user.rank}
            </span>
            {user.tweetProfileImageUrl ? (
              <img
                src={user.tweetProfileImageUrl}
                aria-label={user.tweetProfileImageUrl}
                className="w-8 h-8 rounded-full mr-6"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}
            <h3 className="text-lg font-bold">@{user.tweetUserScreenName}</h3>
          </div>
          <p className="text-xs text-gray-500">{user.count} tweets</p>
        </div>
      </div>
    </Link>
  );
};
