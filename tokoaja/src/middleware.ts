import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayload } from "./lib/jwt";

export const middleware = async (request: NextRequest) => {
  if (
    !request.url.includes("/api") &&
    !request.url.includes("_next/static") &&
    !request.url.includes("_next/image") &&
    !request.url.includes("favicon.ico")
  ) {
    console.log(request.method, request.url);
  }

  if (request.url.includes("/api/cart")) {
    console.log("API", request.method, request.url);

    const cookiesStore = cookies();
    const token = cookiesStore.get("token");
    // console.log(token, "===========");
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzA0NGQyOTQwMjM2MmJiODBkMGM0OCIsImVtYWlsIjoiYW1hbmdAbWFpbC5jb20iLCJpYXQiOjE3MDIwMDk3MjZ9.HEtPv7r9jxra3zMGxXDr66dGL61wG9oCwJFOQt2v1xc"
    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await readPayload<{ id: string; email: string }>(
      token.value
    );
    // token.value

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }
  console.log(NextResponse);
  return NextResponse.next();
};
