import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const getAllTopicsSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      updatedAt: z.string(),
      createdAt: z.string(),
      peoples: z.array(
        z.object({
          id: z.string(),
          tweetUserId: z.string(),
          tweetProfileImageUrl: z.string(),
        }),
      ),
    }),
  ),
});

export const getTopicBySlugSchema = z.object({
  data: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    updatedAt: z.string(),
    createdAt: z.string(),
    tweets: z.array(
      z.object({
        id: z.string(),
        tweetUserId: z.string(),
        tweetProfileImageUrl: z.string(),
        tweetData: z.any(),
        tweetCreatedAt: z.string(),
        tweetId: z.string(),
        tweetText: z.string(),
        tweetUserName: z.string(),
        tweetUserScreenName: z.string(),
      }),
    ),
  }),
});

export const getLeaderboardSchema = z.object({
  data: z.array(
    z.object({
      count: z.number(),
      tweetUserId: z.string(),
      tweetProfileImageUrl: z.string(),
      tweetUserName: z.string(),
      tweetUserScreenName: z.string(),
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

export const restContract = c.router({
  getAllTopics: {
    method: "GET",
    path: "/topic",
    responses: {
      200: getAllTopicsSchema,
    },
    summary: "Get all topics",
  },
  getTopicBySlug: {
    method: "GET",
    path: "/topic/:slug",
    responses: {
      200: getTopicBySlugSchema,
    },
    summary: "Get topic by slug",
  },
  getLeaderboard: {
    method: "GET",
    path: "/leaderboard",
    responses: {
      200: getLeaderboardSchema,
    },
    summary: "Get leaderboard",
  },
  getStats: {
    method: "GET",
    path: "/stats",
    responses: {
      200: getStatsSchema,
    },
    summary: "Get stats",
  },
});
