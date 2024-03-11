import { AddButton } from "@/app/@components/button";
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
      <Link href="/">
        <div className="mb-5 inline-flex border border-gray-300 rounded-md px-3 py-1 text-gray-600 text-sm items-center cursor-pointer hover:bg-gray-100">
          <ChevronLeftIcon className="w-2 h-2" />
          <span className="ml-2">Kembali</span>
        </div>
      </Link>

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
