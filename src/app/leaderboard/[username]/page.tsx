import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { dbClient, dbSchema } from "@/lib/db";
import { tweetQuery } from "@/lib/tweet/query";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Tweet } from "react-tweet/api";

export const dynamic = "force-static";

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const user = await dbClient.query.user.findFirst({
    where: eq(dbSchema.user.screen_name, params.username),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    title: `@${user.screen_name}`,
    description: `Tweet by @${user.screen_name} on Debat Tech Twitter Indonesia`,
  };
}

export async function generateStaticParams() {
  const listUser = await tweetQuery.userList();

  return listUser.map((item) => ({
    username: item.screen_name,
  }));
}

export default async function Page({ params }: Props) {
  const data = await tweetQuery.leaderBoardByUser(params.username);

  if (!data) {
    notFound();
  }

  const listTopic =
    data.tweets
      .map((item) => item.topic_id)
      // filter duplicate
      .filter((value, index, self) => self.indexOf(value) === index) || [];

  return (
    <Container className="py-10 relative">
      <BackButton href="/leaderboard" />

      <div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-balance">
          <a href={`https://twitter.com/${params.username}`}>
            @{params.username}
          </a>
        </h2>
      </div>

      <p className="mt-2 text-sm text-gray-500">{data.tweets.length} tweets</p>

      <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl text-balance">
        Topic
      </h3>
      <div className="mt-4 space-x-2">
        {listTopic.map((topic) => (
          <Link key={topic} href={`/topic/${topic}`}>
            <Tag>{topic}</Tag>
          </Link>
        ))}
      </div>

      {data.tweets.map((item) => (
        <TweetCard key={item.id} tweet={item.data as Tweet} />
      ))}
    </Container>
  );
}
