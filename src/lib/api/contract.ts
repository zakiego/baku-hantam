import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import type {
  ClientInferRequest,
  ClientInferResponseBody,
  ClientInferResponses,
} from "@ts-rest/core";
import { z } from "zod";

extendZodWithOpenApi(z);

const c = initContract();

const getDebatesSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      slug: z.string(),
      description: z.string().nullable(),
      lang: z.enum(["id", "en"]),
      createdAt: z.string(),
      updatedAt: z.string(),
      avatars: z.array(
        z.object({
          image: z.string(),
        }),
      ),
    }),
  ),
  page: z.number(),
  limit: z.number(),
  hasNext: z.boolean(),
});

const getTweetSchema = z.object({
  id: z.string(),
  tweetId: z.string(),
  text: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  authorHandle: z.string(),
  authorImage: z.string().nullable(),
  conversationId: z.string().nullable(),
  tweetedAt: z.string(),
  lang: z.string().nullable(),
});

const getTweetsListSchema = z.object({
  data: z.array(getTweetSchema),
  page: z.number(),
  limit: z.number(),
  hasNext: z.boolean(),
});

const getParticipantSchema = z.object({
  authorHandle: z.string(),
  authorName: z.string(),
  authorImage: z.string().nullable(),
  count: z.number(),
});

const getDebateDetailsSchema = z.object({
  data: z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string().nullable(),
    lang: z.enum(["id", "en"]),
    createdAt: z.string(),
    updatedAt: z.string(),
    avatars: z.array(
      z.object({
        image: z.string(),
      }),
    ),
    participants: z.array(getParticipantSchema),
    dateRange: z
      .object({
        start: z.string(),
        end: z.string(),
      })
      .nullable(),
    tweetCount: z.number(),
  }),
});

const getLeaderboardSchema = z.object({
  data: z.array(
    z.object({
      authorHandle: z.string(),
      authorName: z.string(),
      authorImage: z.string().nullable(),
      count: z.number(),
      rank: z.number(),
    }),
  ),
});

const getStatsSchema = z.object({
  data: z.object({
    users: z.number(),
    topics: z.number(),
    tweets: z.number(),
  }),
});

const getProfileSchema = z.object({
  data: z.object({
    profile: z.object({
      authorHandle: z.string(),
      authorName: z.string(),
      authorImage: z.string().nullable(),
      tweetCount: z.number(),
      firstTweetedAt: z.string().nullable(),
      lastTweetedAt: z.string().nullable(),
      debateCount: z.number(),
      rank: z.number(),
    }),
    debates: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        lang: z.enum(["id", "en"]),
        tweetCount: z.number(),
        lastTweetedAt: z.string(),
      }),
    ),
    tweets: z.object({
      data: z.array(getTweetSchema),
      page: z.number(),
      limit: z.number(),
      hasNext: z.boolean(),
    }),
  }),
});

export const restContract = c.router({
  getDebates: {
    method: "GET",
    path: "/debates",
    query: z.object({
      q: z.string().optional(),
      lang: z.enum(["id", "en"]).optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(20),
    }),
    responses: {
      200: getDebatesSchema,
    },
    summary: "List debates",
  },
  getDebateDetails: {
    method: "GET",
    path: "/debates/:idOrSlug",
    responses: {
      200: getDebateDetailsSchema,
    },
    summary: "Get debate details",
  },
  getDebateTweets: {
    method: "GET",
    path: "/debates/:idOrSlug/tweets",
    query: z.object({
      authorHandle: z.string().optional(),
      lang: z.string().optional(),
      since: z.string().optional(),
      until: z.string().optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(50),
    }),
    responses: {
      200: getTweetsListSchema,
    },
    summary: "Get debate tweets",
  },
  searchTweets: {
    method: "GET",
    path: "/tweets",
    query: z.object({
      q: z.string().optional(),
      authorHandle: z.string().optional(),
      lang: z.string().optional(),
      since: z.string().optional(),
      until: z.string().optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(50),
    }),
    responses: {
      200: getTweetsListSchema,
    },
    summary: "Search tweets",
  },
  getLeaderboard: {
    method: "GET",
    path: "/leaderboard",
    query: z.object({
      lang: z.string().optional(),
      dateFrom: z.string().optional(),
      dateTo: z.string().optional(),
      limit: z.number().optional().default(10),
    }),
    responses: {
      200: getLeaderboardSchema,
    },
    summary: "Get global leaderboard",
  },
  getDebateLeaderboard: {
    method: "GET",
    path: "/leaderboard/:idOrSlug",
    query: z.object({
      limit: z.number().optional().default(10),
    }),
    responses: {
      200: getLeaderboardSchema,
    },
    summary: "Get debate leaderboard",
  },
  getStats: {
    method: "GET",
    path: "/stats",
    responses: {
      200: getStatsSchema,
    },
    summary: "Get stats data",
  },
  getProfile: {
    method: "GET",
    path: "/profile/:handle",
    query: z.object({
      lang: z.string().optional(),
      since: z.string().optional(),
      until: z.string().optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(50),
    }),
    responses: {
      200: getProfileSchema,
    },
    summary: "Get user profile by handle",
  },
});

export type ResponseGetDebates = ClientInferResponseBody<
  typeof restContract.getDebates,
  200
>;

export type ResponseGetDebateDetails = ClientInferResponseBody<
  typeof restContract.getDebateDetails,
  200
>;

export type ResponseGetDebateTweets = ClientInferResponseBody<
  typeof restContract.getDebateTweets,
  200
>;

export type ResponseSearchTweets = ClientInferResponseBody<
  typeof restContract.searchTweets,
  200
>;

export type ResponseGetLeaderboard = ClientInferResponseBody<
  typeof restContract.getLeaderboard,
  200
>;

export type ResponseGetDebateLeaderboard = ClientInferResponseBody<
  typeof restContract.getDebateLeaderboard,
  200
>;

export type ResponseGetStats = ClientInferResponseBody<
  typeof restContract.getStats,
  200
>;

export type ResponseGetProfile = ClientInferResponseBody<
  typeof restContract.getProfile,
  200
>;
