import { AddButton, BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { TweetCard } from "@/components/tweet";
import { restClient } from "@/lib/api/client";
import { REVALIDATE_TIME, SITE_CONFIG } from "@/lib/const";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-static";
export const revalidate = 300;
export const dynamicParams = true;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const resp = await restClient.getDebateDetails({
    params: {
      idOrSlug: params.slug,
    },
  });

  if (resp.status !== 200) {
    return notFound();
  }

  return {
    title: `${resp.body.data.title}`,
    description: resp.body.data.description,
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

export default async function Page(props: Props) {
  const params = await props.params;
  const resp = await restClient.getDebateTweets({
    params: {
      idOrSlug: params.slug,
    },
    query: {
      sort: "asc",
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
          {debate.title}
        </h2>

        <p className="mt-2 leading-8 text-gray-600 text-balance text-sm">
          {debate.description}
        </p>

        {/* AI-Generated Summary Section */}
        {(() => {
          // Filter out placeholder values
          const hasValidSummary =
            debate.summary && debate.summary !== "summary_id";
          const hasValidSummaryId =
            debate.summaryId && debate.summaryId !== "summary_id";

          if (!hasValidSummary && !hasValidSummaryId) return null;

          return (
            <div className="mt-6 border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              {hasValidSummary && debate.lang === "en" && (
                <div className="mb-4 last:mb-0">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    📝 AI Summary
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {debate.summary}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
              {hasValidSummaryId && debate.lang === "id" && (
                <div className="mb-4 last:mb-0">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    📝 Ringkasan AI
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {debate.summaryId}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
              {/* Show both if neither lang matches or show the available one */}
              {(!debate.lang ||
                (debate.lang !== "en" && debate.lang !== "id")) && (
                <>
                  {hasValidSummary && (
                    <div className="mb-4 last:mb-0">
                      <h3 className="text-sm font-semibold text-blue-900 mb-2">
                        📝 AI Summary (English)
                      </h3>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {debate.summary}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                  {hasValidSummaryId && (
                    <div className="mb-4 last:mb-0">
                      <h3 className="text-sm font-semibold text-blue-900 mb-2">
                        📝 Ringkasan AI (Indonesian)
                      </h3>
                      <div className="prose prose-sm max-w-none text-gray-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {debate.summaryId}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })()}
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
