import type { Debates } from "@/lib/tweets";
import { getTweetId, getTweetWithCache } from "@/lib/utils";

interface Props {
  tweets: Debates[number]["tweets"];
}

export const AvatarTweets = async (props: Props) => {
  const { tweets } = props;

  const listTweets = await Promise.all(
    tweets.map(async (tweet, id) => await getTweetWithCache(getTweetId(tweet))),
  );

  const listAvatars = listTweets
    .flatMap((tweet) => {
      const user = tweet?.user.profile_image_url_https;
      const quoted = tweet?.quoted_tweet?.user.profile_image_url_https;

      return [user, quoted];
    })
    .filter((value, index, self) => self.indexOf(value) === index); // remove duplicate

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {listAvatars.map((avatar, id) => (
        <img
          key={avatar}
          className="inline-block h-8 w-8xxw rounded-full ring-2 ring-white"
          src={avatar}
          alt=""
        />
      ))}
    </div>
  );
};
