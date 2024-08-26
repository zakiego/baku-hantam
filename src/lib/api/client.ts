import { initClient, tsRestFetchApi } from "@ts-rest/core";
import { restContract } from "./contract";

export const restClient = initClient(restContract, {
  baseHeaders: {},
  baseUrl: "http://localhost:3000/api",
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
