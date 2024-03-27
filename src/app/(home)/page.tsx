import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { tweetQuery } from "@/lib/tweet/query";
import Link from "next/link";

export const dynamic = "force-static";

export default async function Page() {
  const data = await tweetQuery.home();

  return (
    <div>
      <Header />
      <Container>
        {data.map(async (item) => {
          return (
            <Link key={item.topic.id} href={`/topic/${item.topic.id}`}>
              <div className="px-4 py-8 my-4 bg-white border-b border-b-slate-200 cursor-pointer">
                <div className="flex -space-x-2 overflow-hidden">
                  {item.users.map((avatar, id) => (
                    <img
                      key={`${id}-${avatar}`}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                      src={avatar as string}
                      alt=""
                    />
                  ))}
                </div>
                <h1 className="text-lg font-bold mt-2">{item.topic.title}</h1>
                <p className="mt-2 text-xs text-gray-500">
                  {item.topic.description}
                </p>
              </div>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
