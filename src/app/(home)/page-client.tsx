"use client";

import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { getAllTopicsSchema } from "@/lib/api/contract";
import { ListOrderedIcon } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import type { z } from "zod";

export const dynamic = "force-static";

interface Props {
  data: z.infer<typeof getAllTopicsSchema>["data"];
}

const sortOptions = [
  { label: "Paling baru dibiarkan", value: "date" },
  { label: "Paling banyak tweetnya", value: "tweet" },
  { label: "Paling banyak orang yang nimbrung", value: "people" },
] as const;

const sortOptionsMap = sortOptions.map((option) => option.value);

export default function PageClientHome({ data }: Props) {
  const [topicQuery, setTopicQuery] = useQueryState("topic");
  const [sortQuery, setSortQuery] = useQueryState("sort");

  const filteredTopics = useMemo(() => {
    let result = [...data]; // Create a shallow copy of the data array

    if (topicQuery) {
      result = result.filter((topic) =>
        topic.title.toLowerCase().includes(topicQuery.toLowerCase()),
      );
    }

    if (sortQuery === "date") {
      console.log("sort by date");
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    }

    if (sortQuery === "tweet") {
      console.log("sort by tweet");
      result.sort((a, b) => b.tweets_count - a.tweets_count);
    }

    if (sortQuery === "people") {
      console.log("sort by people");
      result.sort((a, b) => b.peoples.length - a.peoples.length);
    }

    return result;
  }, [data, topicQuery, sortQuery]);

  return (
    <div>
      <Header />
      <Container>
        <div className="flex justify-between items-center">
          <SearchInput
            query={topicQuery ?? ""}
            setQuery={setTopicQuery}
            placeholder="Cari topik"
            className="w-full"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-4 py-2 rounded-md ml-3">
                <ListOrderedIcon className="mr-2 h-4 w-4" />
                Urutkan
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>Urutkan berdasarkan</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {sortOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={option.value === sortQuery}
                  onClick={() => setSortQuery(option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filteredTopics?.map((topic) => {
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
