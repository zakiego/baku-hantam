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
            <span className="text-md text-slate-600 mr-3 font-bold">
              {user.rank}
            </span>
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
