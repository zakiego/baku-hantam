"use client";

import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/input";
import { restClient } from "@/lib/api/client";
import type { getAllTopicsSchema } from "@/lib/api/contract";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import type { z } from "zod";

export const dynamic = "force-static";

interface Props {
  data: z.infer<typeof getAllTopicsSchema>["data"];
}

export default function PageClientHome({ data }: Props) {
  const [topicQuery, setTopicQuery] = useQueryState(
    "topic",
    parseAsString.withDefault(""),
  );

  const filteredTopic = useMemo(() => {
    if (!topicQuery) {
      return data;
    }

    return data.filter((topic) =>
      topic.title.toLowerCase().includes(topicQuery.toLowerCase()),
    );
  }, [data, topicQuery]);

  return (
    <div>
      <Header />
      <Container>
        <SearchInput
          query={topicQuery}
          setQuery={setTopicQuery}
          placeholder="Cari topik"
        />
        {filteredTopic.map((topic) => {
          return (
            <Link key={topic.id} href={`/topic/${topic.slug}`}>
              <div className="px-4 py-8 my-4 bg-white border-b border-b-slate-200 cursor-pointer">
                <div className="flex -space-x-2 overflow-hidden">
                  {topic.peoples.map((people, id) => (
                    <img
                      key={`${topic.id}-${people.id}`}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                      src={people.profile_image_url}
                      alt={people.user_id}
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
