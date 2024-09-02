import { generateOpenApi } from "@ts-rest/open-api";

import { restContract } from "@/lib/api/contract";

export const openApiDocument = generateOpenApi(restContract, {
  info: {
    title: "Posts API",
    version: "1.0.0",
  },
});
