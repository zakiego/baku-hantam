"use client";

import { CardLeaderboard } from "@/app/leaderboard/cards";
import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import type { z } from "zod";

import { SearchInput } from "@/components/input";
import { Stats } from "@/components/stats";
import type { ResponseGetLeaderboard } from "@/lib/api/contract";
import type { ResponseGetStats } from "@/lib/api/contract";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

interface Props {
  datav2: ResponseGetLeaderboard;
  stats: ResponseGetStats["data"];
}

export default function PageClientLeaderbord({ datav2, stats }: Props) {
  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));

  const filteredData = useMemo(() => {
    if (!query) {
      return datav2.data;
    }

    return datav2.data.filter((user) =>
      user.authorHandle.toLowerCase().includes(query.toLowerCase()),
    );
  }, [datav2.data, query]);

  return (
    <Container className="py-10 relative">
      <BackButton href="/leaderboard" />

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-balance">
        Leaderboard
      </h2>

      <div className="pt-3">
        <Stats stats={stats} />
      </div>

      <div className="mt-4 mb-6">
        <SearchInput
          query={query}
          setQuery={(query) => setQuery(query)}
          placeholder="Cari username"
          autoComplete="off"
          data-1p-ignore
        />
      </div>

      <div className="mt-6">
        {filteredData.map((item) => (
          <CardLeaderboard
            key={item.authorHandle}
            user={{
              authorHandle: item.authorHandle,
              authorName: item.authorName,
              authorImage: item.authorImage ?? "",
              count: item.count,
              rank: item.rank,
            }}
          />
        ))}
      </div>
    </Container>
  );
}
