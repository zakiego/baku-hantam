import { unstable_cache } from "next/cache";
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
// import { getTweetWithCache } from "@/lib/utils";

// const getTweet = unstable_cache(
//   async (id: string) => getTweetWithCache(id),
//   ["tweet"],
//   {
//     revalidate: 3600 * 24, // 24 hours
//   },
// );

// const getTweet = getTweetWithCache;

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

const TweetWrapper = async ({ tweet }: { tweet: Tweet | null }) => {
  try {
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
    // return tweet ? <MyTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
};

export const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  return (
    <Suspense fallback={<TweetSkeleton />}>
      <div className="my-class">
        <TweetWrapper tweet={tweet} />
      </div>
    </Suspense>
  );
};
