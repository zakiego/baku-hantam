import PageClientHome from "@/app/(home)/page-client";
import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { apiV2, restClient } from "@/lib/api/client";
import { REVALIDATE_TIME } from "@/lib/const";
import Link from "next/link";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

export default async function Page() {
  const resp = await restClient.getAllTopics();
  const respV2 = await apiV2.getDebates();


  if (resp.status !== 200) {
    return <div>error</div>;
  }

  if (respV2.status !== 200) {
    return <div>error v2 {JSON.stringify(respV2)}</div>;
  }

  return <PageClientHome data={resp.body.data} datav2={respV2.body} />;
}
