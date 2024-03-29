import type { tweetQuery } from "@/lib/tweet/query";
import Link from "next/link";

interface Props {
  user: Awaited<ReturnType<typeof tweetQuery.leaderBoard>>[number];
}

export const CardLeaderboard = (props: Props) => {
  const { user } = props;

  return (
    <Link href={`/leaderboard/${user.profile.screen_name}`}>
      <div
        key={user.profile.screen_name}
        className="px-4 py-6 my-4 bg-white border-b border-b-slate-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-md text-slate-600 mr-3 font-bold">
              {user.rank}
            </span>
            {user.profile?.profile_image_url_https ? (
              <img
                src={user.profile?.profile_image_url_https || ""}
                aria-label={user.profile?.screen_name || ""}
                className="w-8 h-8 rounded-full mr-6"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}
            <h3 className="text-lg font-bold">@{user.profile.screen_name}</h3>
          </div>
          <p className="text-xs text-gray-500">{user.tweets.length} tweets</p>
        </div>
      </div>
    </Link>
  );
};
