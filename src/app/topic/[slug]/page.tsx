import { AddButton, BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { TweetCard } from "@/components/tweet";
import { restClient } from "@/lib/api/client";
import { REVALIDATE_TIME, SITE_CONFIG } from "@/lib/const";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;
export const dynamicParams = true;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const resp = await restClient.getTopicBySlug({
    params: {
      slug: params.slug,
    },
  });

  if (resp.status !== 200) {
    return notFound();
  }

  const { data: topic } = resp.body;

  return {
    title: `${topic.title}`,
    description: topic.description,
  };
}

export async function generateStaticParams() {
  const resp = await restClient.getAllTopics();

  if (resp.status !== 200) {
    throw new Error("Failed to fetch all topics");
  }

  return resp.body.data.map((item) => ({
    slug: item.slug,
  }));
}

export default async function Page({ params }: Props) {
  const resp = await restClient.getTopicBySlug({
    params: {
      slug: params.slug,
    },
  });

  if (resp.status !== 200) {
    return notFound();
  }

  const { data: topic } = resp.body;

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-balance">
          {topic.title}
        </h2>

        <p className="mt-2 leading-8 text-gray-600 text-balance text-sm">
          {topic.description}
        </p>
      </div>

      <div>
        <AddButton href={SITE_CONFIG.FORM}>Tambahkan Tweet</AddButton>
      </div>

      <div>
        {topic.tweets.map((tweet) => {
          return <TweetCard key={tweet.id} tweet={tweet.tweet_data} />;
        })}
      </div>
    </Container>
  );
}
