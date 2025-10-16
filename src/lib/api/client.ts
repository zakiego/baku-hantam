import { restContract } from "@/lib/api/contract";
import { ENV } from "@/lib/env";
import { initClient, tsRestFetchApi } from "@ts-rest/core";

export const restClient = initClient(restContract, {
  baseUrl: ENV.NEXT_PUBLIC_API_URL,
  baseHeaders: {
    "Content-Type": "application/json",
  },
  api: async (args) => {
    return tsRestFetchApi({
      ...args,
      fetchOptions: {
        ...args.fetchOptions,
        cache: "no-store",
      },
    });
  },
});
