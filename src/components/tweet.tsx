import { unstable_cache } from "next/cache";
import { Suspense } from "react";
import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  enrichTweet,
} from "react-tweet";
import {
  QuotedTweet,
  TweetActions,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInReplyTo,
  TweetInfo,
  TweetMedia,
  type TwitterComponents,
} from "react-tweet";
import type { Tweet } from "react-tweet/api";

const getTweet = async (id: string) => {
  const response = await fetch(
    `https://bakuhantam-cache.zakiego.com/api/tweet/${id}?mode=image`,
  );

  const { data } = await response.json();
  return data as Promise<Tweet>;
};

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

const TweetWrapper = async ({
  tweet,
}: { tweet: Promise<Tweet> | Tweet | null }) => {
  try {
    const resolvedTweet = await tweet;

    return resolvedTweet ? (
      <EmbeddedTweet tweet={resolvedTweet} />
    ) : (
      <TweetNotFound />
    );
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
        <TweetWrapper tweet={getTweet(tweetId)} />
      </div>
    </Suspense>
  );
};
