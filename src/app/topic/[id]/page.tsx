import { AddButton } from "@/app/@components/button";
import { Container } from "@/components/container";
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

interface Params {
  id: string;
}

export default function Page({ params }: Props) {
  const debate = debates.find((debate) => debate.slug === params.id);

  if (!debate) {
    notFound();
  }

  return (
    <Container className="py-10 relative">
      <Link href="/">
        <div className="text-xs inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-white bg-balance hover:bg-opacity-75 bg-gray-900 mb-6">
          <ChevronLeftIcon className="w-2.5 h-2.5" />
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
        <AddButton
          href={SITE_CONFIG.CREATE_ISSUE(
            `Tambahkan tweet untuk topik "${debate.title}"`,
          )}
        >
          Tambahkan Tweet
        </AddButton>
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

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={clsx("w-6 h-6", className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);
