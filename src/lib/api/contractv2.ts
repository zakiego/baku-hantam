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
      titleEn: z.string(),
      titleId: z.string(),
      slug: z.string(),
      descriptionEn: z.string().nullable(),
      descriptionId: z.string().nullable(),
      lang: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      avatars: z
        .array(
          z.object({
            image: z.string(),
          }),
        )
        .nullable(),
    }),
  ),
  page: z.number(),
  limit: z.number(),
  hasNext: z.boolean(),
});

const getLeaderboardSchema = z.object({
  data: z.array(
    z.object({
      authorHandle: z.string(),
      authorName: z.string(),
      authorImage: z.string(),
      count: z.number(),
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

export const restContractV2 = c.router({
  getDebates: {
    method: "GET",
    path: "/debates",
    query: z.object({
      page: z.number().optional().default(1),
      limit: z.number().optional().default(1000),
    }),
    responses: {
      200: getDebatesSchema,
    },
    summary: "Get all debates",
  },
  getLeaderboard: {
    method: "GET",
    path: "/leaderboard",
    responses: {
      200: getLeaderboardSchema,
    },
    summary: "Get leaderboard data",
  },
  getStats: {
    method: "GET",
    path: "/stats",
    responses: {
      200: getStatsSchema,
    },
    summary: "Get stats data",
  },
});

export type ClientInferRequestV2 = ClientInferRequest<typeof restContractV2>;
export type ClientInferResponseV2 = ClientInferResponses<typeof restContractV2>;
export type ResponseGetDebates = ClientInferResponseBody<
  typeof restContractV2.getDebates,
  200
>;

export type ResponseGetLeaderboard = ClientInferResponseBody<
  typeof restContractV2.getLeaderboard,
  200
>;

export type ResponseGetStats = ClientInferResponseBody<
  typeof restContractV2.getStats,
  200
>;
