import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { TweetCard } from "@/components/tweet";
import { debates } from "@/lib/tweets";
import { getTweetId } from "@/lib/utils";
import Link from "next/link";
import { boolean } from "zod";

interface Props {
  params: {
    username: string;
  };
}

export async function generateStaticParams() {
  const listUsernames: string[] = [];

  debates.map((item) =>
    item.tweets.map((tweet) => {
      const username = tweet.split("/")[3];
      listUsernames.push(username);
    }),
  );

  return listUsernames.map((item) => ({
    username: item,
  }));
}

export default function Page({ params }: Props) {
  const debate = debates.filter((debate) =>
    debate.tweets.some((tweet) => tweet.split("/")[3] === params.username),
  );

  const listTopic = debate.map((item) => item.slug);

  const tweets = debate
    .flatMap((item) => item.tweets)
    .filter((item) => item.split("/")[3] === params.username);

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

      <p className="mt-2 text-sm text-gray-500">{debate.length} tweets</p>

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

      {tweets.map((item, index) => (
        <TweetCard key={item} tweetId={getTweetId(item)} />
      ))}
    </Container>
  );
}
