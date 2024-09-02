import { openApiDocument } from "@/lib/api/open-api";

export function GET() {
  return Response.json(openApiDocument);
}
