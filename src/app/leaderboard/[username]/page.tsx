import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { restClient } from "@/lib/api/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

interface Props {
  params: {
    username: string;
  };
}

// export async function generateMetadata({ params }: Props) {
//   const user = await dbClient.query.user.findFirst({
//     where: eq(dbSchema.user.screen_name, params.username),
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   return {
//     title: `@${user.screen_name}`,
//     description: `Tweet by @${user.screen_name} on Debat Tech Twitter Indonesia`,
//   };
// }

export async function generateStaticParams() {
  const resp = await restClient.getLeaderboard();

  if (resp.status !== 200) {
    throw new Error("Failed to fetch leaderboard");
  }

  return resp.body.data.map((item) => ({
    username: item.tweetUserScreenName,
  }));
}

export default async function Page({ params }: Props) {
  const resp = await restClient.getUserByScreenName({
    params: {
      screenName: params.username,
    },
  });

  if (resp.status !== 200) {
    notFound();
  }

  const { tweets, topics, profile } = resp.body.data;

  return (
    <Container className="py-10 relative">
      <BackButton href="/leaderboard" />

      <div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-balance">
          <a href={`https://twitter.com/${profile.tweetUserScreenName}`}>
            @{profile.tweetUserScreenName}
          </a>
        </h2>
      </div>

      <p className="mt-2 text-sm text-gray-500">{tweets.length} tweets</p>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl text-balance">
        Topic
      </h3>
      <div className="mt-4 space-x-2">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/topic/${topic.slug}`}>
            <Tag>{topic.slug}</Tag>
          </Link>
        ))}
      </div>

      {tweets.map((item) => (
        <TweetCard key={item.id} tweet={item.tweetData} />
      ))}
    </Container>
  );
}
