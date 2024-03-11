import { NextResponse } from "next/server";

function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  const domain = requestHeaders.get("host") || "";
  const [, pathnameWithSearchParams = ""] =
    new RegExp(`https?://${domain}(.*)`).exec(request.url) || [];
  const [pathname, searchParams] = pathnameWithSearchParams.split("?");

  requestHeaders.set("x-request-domain", domain);
  requestHeaders.set("x-request-url", request.url);

  pathname && requestHeaders.set("x-request-pathname", pathname);
  searchParams && requestHeaders.set("x-request-search", searchParams);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export default middleware;
