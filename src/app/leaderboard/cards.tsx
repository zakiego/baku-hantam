import { MedalIcon, TrophyIcon } from "@/components/icon";
import type { getLeaderboardSchema } from "@/lib/api/contract";
import Link from "next/link";
import type { z } from "zod";

interface Props {
  user: z.infer<typeof getLeaderboardSchema>["data"][number];
}

export const CardLeaderboard = (props: Props) => {
  const { user } = props;

  return (
    <Link href={`/leaderboard/${user.tweet_user_screen_name}`}>
      <div
        key={user.tweet_user_screen_name}
        className="px-4 py-6 my-4 bg-white border-b border-b-slate-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center mr-3 min-w-[40px]">
              {user.rank === 1 && (
                <TrophyIcon className="w-5 h-5 text-yellow-500 mr-1" />
              )}
              {user.rank === 2 && (
                <MedalIcon className="w-5 h-5 text-gray-400 mr-1" />
              )}
              {user.rank === 3 && (
                <MedalIcon className="w-5 h-5 text-amber-700 mr-1" />
              )}
              <span className="text-md text-slate-600 font-bold">
                {user.rank}
              </span>
            </div>
            {user.tweet_profile_image_url ? (
              <img
                src={user.tweet_profile_image_url}
                aria-label={user.tweet_profile_image_url}
                className="w-8 h-8 rounded-full mr-6"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}
            <h3 className="text-lg font-bold">
              @{user.tweet_user_screen_name}
            </h3>
          </div>
          <p className="text-xs text-gray-500">{user.count} tweets</p>
        </div>
      </div>
    </Link>
  );
};
