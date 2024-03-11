import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import type { GroupedByUsername } from "@/lib/types";
import { getTweetId } from "@/lib/utils";
import Link from "next/link";

interface Props {
  user: GroupedByUsername[number];
}

export const CardLeaderboard = (props: Props) => {
  const { user } = props;

  return (
    <Link href={`/leaderboard/${user.username}`}>
      <div
        key={user.username}
        className="p-4 my-4 bg-white rounded-md shadow-md"
      >
        <div className="flex items-center">
          <div className="pr-5">
            <span className="text-2xl font-bold text-gray-900">
              {user.rank}
            </span>
          </div>

          {user.profile?.profile_image_url_https ? (
            <img
              src={user.profile?.profile_image_url_https || ""}
              aria-label={user.profile?.name || user.username}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
          <div className="ml-4">
            <h3 className="text-lg font-bold">@{user.username}</h3>

            <p className="text-xs text-gray-500">{user.tweets.length} tweets</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
