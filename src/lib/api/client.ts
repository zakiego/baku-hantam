import { ENV } from "@/lib/env";
import { initClient, tsRestFetchApi } from "@ts-rest/core";
import { restContract } from "./contract";
import { restContractV2 } from "./contractv2";

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

export const restClientV2 = initClient(restContractV2, {
  baseUrl: `${ENV.NEXT_PUBLIC_V2_API_URL}/api/v1`,
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
