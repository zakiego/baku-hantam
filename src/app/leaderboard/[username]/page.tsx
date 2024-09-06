import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { restClient } from "@/lib/api/client";
import { REVALIDATE_TIME } from "@/lib/const";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;
export const dynamicParams = true;

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const resp = await restClient.getUserByScreenName({
    params: {
      screenName: params.username,
    },
  });

  if (resp.status !== 200) {
    throw new Error("User not found");
  }

  const screenName = resp.body.data.profile.tweet_user_screen_name;

  return {
    title: `@${screenName}`,
    description: `Tweet by @${screenName} on Debat Tech Twitter Indonesia`,
  };
}

export async function generateStaticParams() {
  const resp = await restClient.getLeaderboard();

  if (resp.status !== 200) {
    throw new Error("Failed to fetch leaderboard");
  }

  return resp.body.data.map((item) => ({
    username: item.tweet_user_screen_name,
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
          <a href={`https://twitter.com/${profile.tweet_user_screen_name}`}>
            @{profile.tweet_user_screen_name}
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
        <TweetCard key={item.id} tweet={item.tweet_data} />
      ))}
    </Container>
  );
}
