import { restContract } from "@/lib/api/contract";
import { generateOpenApi } from "@ts-rest/open-api";

export const openApiDocument = generateOpenApi(restContract, {
  info: {
    title: "Posts API",
    version: "1.0.0",
  },
});
