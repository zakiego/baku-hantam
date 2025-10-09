import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { restClient, restClientV2 } from "@/lib/api/client";
import type { ResponseGetProfile } from "@/lib/api/contractv2";
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
  const resp = await restClientV2.getProfile({
    params: {
      authorHandle: params.username,
    },
  });

  if (resp.status !== 200) {
    throw new Error("User not found");
  }

  const screenName = resp.body.data.profile.authorHandle;

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
  const resp = await restClientV2.getProfile({
    params: {
      authorHandle: params.username,
    },
  });

  if (resp.status !== 200) {
    notFound();
  }

  const { tweets, debates, profile } = resp.body.data;

  return (
    <Container className="py-10 relative">
      <BackButton href="/leaderboard" />

      <div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-balance">
          <a href={`https://twitter.com/${profile.authorHandle}`}>
            @{profile.authorHandle}
          </a>
        </h2>
      </div>

      <p className="mt-2 text-sm text-gray-500">{tweets.data.length} tweets</p>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl text-balance">
        Debates
      </h3>
      <div className="mt-4 space-x-2">
        {debates.map((debate: ResponseGetProfile["data"]["debates"][0]) => (
          <Link key={debate.id} href={`/topic/${debate.slug}`}>
            <Tag>{debate.slug}</Tag>
          </Link>
        ))}
      </div>

      {tweets.data.map(
        (item: ResponseGetProfile["data"]["tweets"]["data"][0]) => (
          <TweetCard key={item.id} tweetId={item.tweetId} />
        ),
      )}
    </Container>
  );
}
