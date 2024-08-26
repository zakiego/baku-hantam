import { ENV } from "@/lib/env";
import { initClient, tsRestFetchApi } from "@ts-rest/core";
import { restContract } from "./contract";

export const restClient = initClient(restContract, {
  baseHeaders: {},
  baseUrl: ENV.NEXT_PUBLIC_API_URL,
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
