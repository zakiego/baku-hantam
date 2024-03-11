"use client";

import { CardLeaderboard } from "@/app/leaderboard/cards";
import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import type { GroupedByUsername } from "@/lib/types";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

interface Props {
  data: GroupedByUsername;
}

export default function PageClientLeaderbord(props: Props) {
  const { data } = props;

  const [query, setQuery] = useQueryState("q");

  const filteredData = useMemo(() => {
    if (!query) {
      return data;
    }

    return data.filter((user) => user.username.includes(query));
  }, [data, query]);

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-balance">
        Leaderboard
      </h2>

      <div>
        <input
          type="text"
          placeholder="Cari username"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md"
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          data-1p-ignore
        />
      </div>

      <div className="mt-4">
        {filteredData.map((user, id) => (
          <CardLeaderboard key={user.username} user={user} />
        ))}
      </div>
    </Container>
  );
}
