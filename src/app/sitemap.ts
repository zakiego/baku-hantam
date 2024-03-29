import { tweetQuery } from "@/lib/tweet/query";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const topics = await tweetQuery.topicList();
  const listUser = await tweetQuery.userList();

  const userPaths = listUser.map((item) => `/leaderboard/${item.screen_name}`);
  const topicPaths = topics.map((item) => `/topic/${item.id}`);

  const paths = ["/", "/leaderboard", ...userPaths, ...topicPaths];

  const DOMAIN = "https://bakuhantam.dev";

  return paths.map((path) => ({
    url: `${DOMAIN}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
}
