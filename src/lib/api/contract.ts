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
});
