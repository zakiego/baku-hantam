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
import type { ResponseGetDebates } from "@/lib/api/contract";
import { ListOrderedIcon } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { z } from "zod";

export const dynamic = "force-static";

interface Props {
  data: ResponseGetDebates;
}

const sortOptions = [
  { label: "Paling baru dibicarakan", value: "date" },
  { label: "Paling banyak tweetnya", value: "tweet" },
  { label: "Paling banyak orang yang nimbrung", value: "people" },
] as const;

const sortOptionsMap = sortOptions.map((option) => option.value);

export default function PageClientHome({ data }: Props) {
  // const [topicQuery, setTopicQuery] = useQueryState("topic");
  // const [sortQuery, setSortQuery] = useQueryState("sort");

  // const filteredTopics = useMemo(() => {
  //   let result = [...data]; // Create a shallow copy of the data array

  //   if (topicQuery) {
  //     result = result.filter((topic) =>
  //       topic.title.toLowerCase().includes(topicQuery.toLowerCase()),
  //     );
  //   }

  //   if (sortQuery === "date") {
  //     console.log("sort by date");
  //     result.sort(
  //       (a, b) =>
  //         new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  //     );
  //   }

  //   if (sortQuery === "tweet") {
  //     console.log("sort by tweet");
  //     result.sort((a, b) => b.tweets_count - a.tweets_count);
  //   }

  //   if (sortQuery === "people") {
  //     console.log("sort by people");
  //     result.sort((a, b) => b.peoples.length - a.peoples.length);
  //   }

  //   return result;
  // }, [data, topicQuery, sortQuery]);

  return (
    <div>
      <Header />
      <Container>
        <div className="flex justify-between items-center">
          {/* <SearchInput
            query={topicQuery ?? ""}
            setQuery={setTopicQuery}
            placeholder="Cari topik"
            className="w-full"
          /> */}
          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>

        {data?.data.map((debate) => {
          // Get the appropriate summary based on language
          const summary =
            debate.lang === "id" ? debate.summaryId : debate.summary;
          // Hide if summary is just the placeholder "summary_id"
          const shouldShowSummary = summary && summary !== "summary_id";

          return (
            <Link key={debate.id} href={`/debate/${debate.slug}`}>
              <div className="px-4 py-8 my-4 bg-white border-b border-b-slate-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex -space-x-2 overflow-hidden">
                  {debate.avatars?.map((avatar) => (
                    <img
                      key={`${debate.id}-${avatar.image}`}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                      src={avatar.image}
                      alt={avatar.image}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ))}
                </div>
                <h1 className="text-lg font-bold mt-2">{debate.title}</h1>
                {debate.description && (
                  <p className="mt-2 text-xs text-gray-500">
                    {debate.description}
                  </p>
                )}

                {/* AI Summary Preview */}
                {shouldShowSummary && (
                  <div className="mt-3 p-3 bg-blue-50 border-l-2 border-blue-400 rounded-r text-xs text-gray-700">
                    <div className="flex items-start gap-1">
                      <span className="text-blue-600 font-semibold shrink-0">
                        📝 AI:
                      </span>
                      <div className="line-clamp-3 prose prose-sm max-w-none [&>*]:my-0 [&>*]:leading-tight">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {summary}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </Container>
    </div>
  );
}
