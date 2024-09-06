"use client";

import { CardLeaderboard } from "@/app/leaderboard/cards";
import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import type { z } from "zod";

import { SearchInput } from "@/components/input";
import { Stats } from "@/components/stats";
import type { getLeaderboardSchema } from "@/lib/api/contract";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

interface Props {
  data: z.infer<typeof getLeaderboardSchema>["data"];
  stats: Stats;
}

export default function PageClientLeaderbord(props: Props) {
  const { data, stats } = props;

  const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));

  const filteredData = useMemo(() => {
    if (!query) {
      return data;
    }

    return data.filter((user) =>
      user.tweet_user_screen_name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [data, query]);

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

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
          <CardLeaderboard key={item.tweet_user_id} user={item} />
        ))}
      </div>
    </Container>
  );
}
