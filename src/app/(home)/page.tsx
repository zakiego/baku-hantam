import { AddButton } from "@/app/@components/button";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { SITE_CONFIG } from "@/lib/const";
import { debates } from "@/lib/tweets";
import Link from "next/link";

export default function Home() {
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
                <h1 className="text-lg font-bold">{debate.title}</h1>
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
