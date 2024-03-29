"use client";

import { CardLeaderboard } from "@/app/leaderboard/cards";
import { BackButton } from "@/components/button";
import { Container } from "@/components/container";
import { SearchIcon } from "@/components/icon";
import type { tweetQuery } from "@/lib/tweet/query";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

interface Props {
  data: Awaited<ReturnType<typeof tweetQuery.leaderBoard>>;
}

export default function PageClientLeaderbord(props: Props) {
  const { data } = props;

  const [query, setQuery] = useQueryState("q");

  const filteredData = useMemo(() => {
    if (!query) {
      return data;
    }

    return data.filter((user) =>
      user.profile.screen_name?.toLowerCase().includes(query.toLowerCase()),
    );
  }, [data, query]);

  return (
    <Container className="py-10 relative">
      <BackButton href="/" />

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl text-balance">
        Leaderboard
      </h2>

      <div className="group flex flex-row-reverse items-center gap-2 mt-4 mb-6 border border-slate-200 rounded-lg overflow-hidden has-[input:focus]:border-slate-400">
        <input
          type="text"
          placeholder="Cari username"
          className="p-2 w-full outline-transparent peer "
          value={query || ""}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          data-1p-ignore
        />
        <SearchIcon className="block w-12 border-r border-r-slate-200 peer-focus:border-r-slate-800 stroke-slate-600 peer-focus:stroke-slate-800 " />
      </div>

      <div className="mt-6">
        {filteredData.map((item) => (
          <CardLeaderboard key={item.profile.screen_name} user={item} />
        ))}
      </div>
    </Container>
  );
}
