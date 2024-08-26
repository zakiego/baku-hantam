import { restContract } from "@/lib/api/contract";
import { createApiUrl } from "@/lib/utils";
import { createNextRoute } from "@ts-rest/next";

export const restRouter = createNextRoute(restContract, {
  getAllTopics: async () => {
    const data = await fetch(createApiUrl("/topic")).then((res) => res.json());

    return {
      status: 200,
      body: data,
    };
  },

  getTopicBySlug: async ({ params }) => {
    const data = await fetch(createApiUrl(`/topic/${params.slug}`)).then(
      (res) => res.json(),
    );

    return {
      status: 200,
      body: data,
    };
  },

  getLeaderboard: async () => {
    const data = await fetch(createApiUrl("/leaderboard")).then((res) =>
      res.json(),
    );

    return {
      status: 200,
      body: data,
    };
  },

  getStats: async () => {
    const data = await fetch(createApiUrl("/stats")).then((res) => res.json());

    return {
      status: 200,
      body: data,
    };
  },

  getUserByScreenName: async ({ params }) => {
    const data = await fetch(createApiUrl(`/user/${params.screenName}`)).then(
      (res) => res.json(),
    );

    return {
      status: 200,
      body: data,
    };
  },
});
