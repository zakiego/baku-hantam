import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { tweetQuery } from "@/lib/tweet/query";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Tweet } from "react-tweet/api";

export const dynamic = "force-static";

interface Props {
  params: {
    username: string;
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

  const listTopic = data.tweets.map((item) => item.topic_id) || [];

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

      {data.tweets.map((item, index) => (
        <TweetCard key={item.id} tweet={item.data as Tweet} />
      ))}
    </Container>
  );
}
