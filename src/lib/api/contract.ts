import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

extendZodWithOpenApi(z);

const c = initContract();

const getAllTopicsSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      updated_at: z.string(),
      created_at: z.string(),
      tweets_count: z.number(),
      peoples: z.array(
        z.object({
          id: z.string(),
          user_id: z.string(),
          profile_image_url: z.string(),
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

const getUserByScreenNameSchema = z.object({
  data: z.object({
    profile: z.object({
      tweetUserId: z.string(),
      tweetProfileImageUrl: z.string(),
      tweetUserName: z.string(),
      tweetUserScreenName: z.string(),
    }),
    tweets: z.array(
      z.object({
        id: z.string(),
        tweetUserId: z.string(),
        tweetProfileImageUrl: z.string(),
        tweetCreatedAt: z.string(),
        tweetId: z.string(),
        tweetText: z.string(),
        tweetUserName: z.string(),
        tweetUserScreenName: z.string(),
        tweetData: z.any(),
        topic: z.object({
          id: z.string(),
          title: z.string(),
          slug: z.string(),
        }),
      }),
    ),
    topics: z.array(
      z.object({ id: z.string(), title: z.string(), slug: z.string() }),
    ),
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
  getUserByScreenName: {
    method: "GET",
    path: "/user/:screenName",
    responses: {
      200: getUserByScreenNameSchema,
    },
    summary: "Get user by screen name",
  },
});
