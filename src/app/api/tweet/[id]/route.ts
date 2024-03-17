// import { dbClient, dbSchema } from "@/lib/db";
// import { redis } from "@/lib/redis";
// import { sql } from "drizzle-orm";
// import { NextResponse } from "next/server";
// import { getTweet as reactTweetApi } from "react-tweet/api";

// export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  return null;

  // const { id } = params;

  // const data = await reactTweetApi(id);

  // if (!data) {
  //   const cached = await redis.get(`tweet:${id}`);

  //   if (!cached) {
  //     return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
  //   }

  //   console.log("Cache hit for tweet:", id);
  //   return NextResponse.json(JSON.parse(cached));
  // }

  // await dbClient.transaction(async (trx) => {
  //   await trx
  //     .insert(dbSchema.user)
  //     .values({
  //       id: data.user.id_str,
  //       name: data.user.name,
  //       screen_name: data.user.screen_name,
  //       profile_image_url_https: data.user.profile_image_url_https,
  //     })
  //     .onConflictDoUpdate({
  //       target: dbSchema.user.id,
  //       set: {
  //         name: data.user.name,
  //         screen_name: data.user.screen_name,
  //         profile_image_url_https: data.user.profile_image_url_https,
  //       },
  //     });

  //   await trx
  //     .insert(dbSchema.tweet)
  //     .values({
  //       id,
  //       data,
  //       user_id: data.user.id_str,
  //     })
  //     .onConflictDoUpdate({
  //       target: dbSchema.tweet.id,
  //       set: {
  //         data,
  //         user_id: data.user.id_str,
  //       },
  //     });
  // });

  // await redis.set(`tweet:${id}`, JSON.stringify(data));
  // console.log("Cached tweet:", id);

  // return NextResponse.json(data);
}
