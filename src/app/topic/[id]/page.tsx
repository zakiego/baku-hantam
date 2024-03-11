import { AddButton, BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { ChevronLeftIcon } from "@/components/icon";
import { TweetCard } from "@/components/tweet";
import { SITE_CONFIG } from "@/lib/const";
import { debates } from "@/lib/tweets";
import { getTweetId } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return debates.map((item) => ({
    id: item.slug,
  }));
}

export default function Page({ params }: Props) {
  const debate = debates.find((debate) => debate.slug === params.id);

  if (!debate) {
    notFound();
  }

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-balance">
          {debate.title}
        </h2>

        <p className="mt-2 leading-8 text-gray-600 text-balance text-sm">
          {debate.description}
        </p>
      </div>

      <div>
        <AddButton href={SITE_CONFIG.FORM}>Tambahkan Tweet</AddButton>
      </div>

      <div>
        {debate.tweets.map((tweet, id) => {
          {
            const tweetId = getTweetId(tweet);

            return <TweetCard key={tweetId} tweetId={tweetId} />;
          }
        })}
      </div>
    </Container>
  );
}
