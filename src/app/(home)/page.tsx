import PageClientHome from "@/app/(home)/page-client";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { restClient } from "@/lib/api/client";
import { REVALIDATE_TIME } from "@/lib/const";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

export default async function Page() {
  const resp = await restClient.getAllTopics();

  if (resp.status !== 200) {
    return <div>error</div>;
  }

  return <PageClientHome data={resp.body.data} />;
}
