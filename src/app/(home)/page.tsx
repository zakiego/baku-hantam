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
        {data.map((item) => {
          return (
            <Link key={item.id} href={`/topic/${item.id}`}>
              <div className="px-4 py-8 my-4 bg-white border-b border-b-slate-200 cursor-pointer">
                <div className="flex -space-x-2 overflow-hidden">
                  {item.users.map((avatar, id) => (
                    <img
                      key={`${avatar}`}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                      src={avatar as string}
                      alt={`avatar-${id}`}
                    />
                  ))}
                </div>
                <h1 className="text-lg font-bold mt-2">{item.title}</h1>
                <p className="mt-2 text-xs text-gray-500">{item.description}</p>
              </div>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
