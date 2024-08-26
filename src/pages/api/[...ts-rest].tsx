import { restContract } from "@/lib/api/contract";
import { restRouter } from "@/lib/api/router";
import { createNextRouter } from "@ts-rest/next";

export default createNextRouter(restContract, restRouter);
