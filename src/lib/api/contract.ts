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
    updated_at: z.string(),
    created_at: z.string(),
    tweets: z.array(
      z.object({
        id: z.string(),
        tweet_user_id: z.string(),
        tweet_profile_image_url: z.string(),
        tweet_data: z.any(),
        tweet_created_at: z.string(),
        tweet_id: z.string(),
        tweet_text: z.string(),
        tweet_user_name: z.string(),
        tweet_user_screen_name: z.string(),
      }),
    ),
  }),
});

export const getLeaderboardSchema = z.object({
  data: z.array(
    z.object({
      count: z.number(),
      tweet_user_id: z.string(),
      tweet_profile_image_url: z.string(),
      tweet_user_name: z.string(),
      tweet_user_screen_name: z.string(),
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
      tweet_user_id: z.string(),
      tweet_profile_image_url: z.string(),
      tweet_user_name: z.string(),
      tweet_user_screen_name: z.string(),
    }),
    tweets: z.array(
      z.object({
        id: z.string(),
        tweet_user_id: z.string(),
        tweet_profile_image_url: z.string(),
        tweet_created_at: z.string(),
        tweet_id: z.string(),
        tweet_text: z.string(),
        tweet_user_name: z.string(),
        tweet_user_screen_name: z.string(),
        tweet_data: z.any(),
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
