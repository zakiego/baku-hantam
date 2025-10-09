import { restContractV2 } from "@/lib/api/contractv2";
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

export const apiV2 = initClient(restContractV2, {
  baseHeaders: {},
  baseUrl: `${ENV.NEXT_PUBLIC_V2_API_URL}/api/v1`,
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
