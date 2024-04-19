import { AddButton, BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { TweetCard } from "@/components/tweet";
import { SITE_CONFIG } from "@/lib/const";
import { tweetQuery } from "@/lib/tweet/query";
import { notFound } from "next/navigation";
import type { Tweet } from "react-tweet/api";

export const dynamic = "force-static";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const topic = await tweetQuery.topicDetail(params.id);

  if (!topic) {
    throw new Error("Topic not found");
  }

  return {
    title: `${topic.title}`,
    description: topic.description,
  };
}

export async function generateStaticParams() {
  const topics = await tweetQuery.topicList();

  return topics.map((item) => ({
    id: item.id,
  }));
}

export default async function Page({ params }: Props) {
  const topicDetail = await tweetQuery.topicDetail(params.id);
  const tweets = await tweetQuery.tweetsByTopic(params.id);

  if (!topicDetail) {
    notFound();
  }

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-balance">
          {topicDetail?.title}
        </h2>

        <p className="mt-2 leading-8 text-gray-600 text-balance text-sm">
          {topicDetail?.description}
        </p>
      </div>

      <div>
        <AddButton href={SITE_CONFIG.FORM}>Tambahkan Tweet</AddButton>
      </div>

      <div>
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} tweet={tweet.data as Tweet} />;
        })}
      </div>
    </Container>
  );
}
