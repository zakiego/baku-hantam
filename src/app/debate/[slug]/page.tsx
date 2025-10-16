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
  const resp = await restClient.getDebateDetails({
    params: {
      idOrSlug: params.slug,
    },
  });

  if (resp.status !== 200) {
    return notFound();
  }

  return {
    title: `${resp.body.data.titleId}`,
    description: resp.body.data.descriptionId,
  };
}

export async function generateStaticParams() {
  const resp = await restClient.getDebates();

  if (resp.status !== 200) {
    throw new Error("Failed to fetch all debates");
  }

  return resp.body.data.map((debate) => ({
    slug: debate.slug,
  }));
}

export default async function Page({ params }: Props) {
  const resp = await restClient.getDebateTweets({
    params: {
      idOrSlug: params.slug,
    },
  });

  const respDebate = await restClient.getDebateDetails({
    params: {
      idOrSlug: params.slug,
    },
  });

  if (resp.status !== 200 || respDebate.status !== 200) {
    return notFound();
  }

  const { data: tweets } = resp.body;
  const { data: debate } = respDebate.body;

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-balance">
          {debate.titleId}
        </h2>

        <p className="mt-2 leading-8 text-gray-600 text-balance text-sm">
          {debate.descriptionId}
        </p>
      </div>

      <div>
        <AddButton href={SITE_CONFIG.FORM}>Tambahkan Tweet</AddButton>
      </div>

      <div>
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} tweetId={tweet.tweetId} />;
        })}
      </div>
    </Container>
  );
}
