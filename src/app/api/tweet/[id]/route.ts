import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;

  const data = await getTweet(id);

  if (!data) {
    const cached = await redis.get(`tweet:${id}`);

    if (!cached) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 });
    }

    console.log("Cache hit for tweet:", id);
    return NextResponse.json(JSON.parse(cached));
  }

  await redis.set(`tweet:${id}`, JSON.stringify(data));
  console.log("Cached tweet:", id);

  return NextResponse.json(data);
}
