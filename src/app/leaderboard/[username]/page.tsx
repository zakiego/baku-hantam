import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { MedalIcon, TrophyIcon } from "@/components/icon";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { restClient } from "@/lib/api/client";
import type { ResponseGetProfile } from "@/lib/api/contract";
import { REVALIDATE_TIME } from "@/lib/const";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const resp = await restClient.getProfile({
    params: {
      handle: params.username,
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
    username: item.authorHandle,
  }));
}

export default async function Page(props: Props) {
  const params = await props.params;
  const resp = await restClient.getProfile({
    params: {
      handle: params.username,
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
        <div className="mt-2 flex items-center gap-2">
          {profile.rank === 1 && (
            <TrophyIcon className="w-5 h-5 text-yellow-500" />
          )}
          {profile.rank === 2 && (
            <MedalIcon className="w-5 h-5 text-gray-400" />
          )}
          {profile.rank === 3 && (
            <MedalIcon className="w-5 h-5 text-amber-700" />
          )}
          <p className="text-sm text-gray-500">Rank: {profile.rank}</p>
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-500">{tweets.data.length} tweets</p>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl text-balance">
        Debates
      </h3>
      <div className="mt-4 space-x-2">
        {debates.map((debate: ResponseGetProfile["data"]["debates"][0]) => (
          <Link key={debate.id} href={`/debate/${debate.slug}`}>
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
