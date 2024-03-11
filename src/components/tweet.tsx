import { unstable_cache } from "next/cache";
import { getTweet as _getTweet } from "react-tweet/api";
import {
  TweetSkeleton,
  EmbeddedTweet,
  TweetNotFound,
  enrichTweet,
} from "react-tweet";
import {
  type TwitterComponents,
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetBody,
  TweetMedia,
  TweetInfo,
  TweetActions,
  QuotedTweet,
} from "react-tweet";
import { Suspense } from "react";
import type { Tweet } from "react-tweet/api";

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ["tweet"],
  {
    revalidate: 3600 * 24, // 24 hours
  },
);

// export const MyTweet = ({
//   tweet: t,
//   components,
// }: { tweet: Tweet; components?: TwitterComponents }) => {
//   const tweet = enrichTweet(t);

//   return (
//     <TweetContainer>
//       <TweetHeader tweet={tweet} />
//       {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
//       <TweetBody tweet={tweet} />
//       {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} /> : null}
//       {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
//       <TweetInfo tweet={tweet} />
//       <TweetActions tweet={tweet} />
//       {/* We're not including the `TweetReplies` component that adds the reply button */}
//     </TweetContainer>
//   );
// };

const TweetWrapper = async ({ id }: { id: string }) => {
  try {
    const tweet = await getTweet(id);
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
    // return tweet ? <MyTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
};

export const TweetCard = ({ tweetId }: { tweetId: string }) => {
  return (
    <Suspense fallback={<TweetSkeleton />}>
      <div className="my-class">
        <TweetWrapper id={tweetId} />
      </div>
    </Suspense>
  );
};
