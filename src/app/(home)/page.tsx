import { AvatarTweets } from "@/app/@components/avatar";
import { AddButton } from "@/app/@components/button";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { debates } from "@/lib/tweets";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Header />
      <Container>
        {debates.map(async (debate, id) => {
          return (
            <Link key={debate.title} href={`/topic/${debate.slug}`}>
              <div
                key={debate.title}
                className="p-4 my-4 bg-white rounded-md shadow-md cursor-pointer"
              >
                <AvatarTweets tweets={debate.tweets} />

                <h1 className="text-lg font-bold mt-2">{debate.title}</h1>
                <p className="mt-2 text-xs text-gray-500">
                  {debate.description}
                </p>
              </div>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
