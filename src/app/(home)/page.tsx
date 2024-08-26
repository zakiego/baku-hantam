import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { restClient } from "@/lib/api/client";
import { tweetQuery } from "@/lib/tweet/query";
import Link from "next/link";

export const dynamic = "force-static";

export default async function Page() {
  const resp = await restClient.getAllTopics();

  if (resp.status !== 200) {
    return <div>error</div>;
  }

  return (
    <div>
      <Header />
      <Container>
        {resp.body.data.map((topic) => {
          return (
            <Link key={topic.id} href={`/topic/${topic.slug}`}>
              <div className="px-4 py-8 my-4 bg-white border-b border-b-slate-200 cursor-pointer">
                <div className="flex -space-x-2 overflow-hidden">
                  {topic.peoples.map((people, id) => (
                    <img
                      key={`${topic.id}-${people.id}`}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                      src={people.tweetProfileImageUrl}
                      alt={people.tweetUserId}
                    />
                  ))}
                </div>
                <h1 className="text-lg font-bold mt-2">{topic.title}</h1>
                <p className="mt-2 text-xs text-gray-500">
                  {topic.description}
                </p>
              </div>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
