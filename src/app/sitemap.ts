import { restClient } from "@/lib/api/client";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const topics = await restClient.getAllTopics();
  const listUser = await restClient.getLeaderboard();

  if (topics.status !== 200 || listUser.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const topicPaths = topics.body.data.map((item) => `/topic/${item.slug}`);
  const userPaths = listUser.body.data.map(
    (item) => `/leaderboard/${item.tweetUserScreenName}`,
  );

  const paths = ["/", "/leaderboard", ...userPaths, ...topicPaths];

  const DOMAIN = "https://bakuhantam.dev";

  return paths.map((path) => ({
    url: `${DOMAIN}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
}
