import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("___middlware");

  let cookie = request.cookies.get('theme');

  request.cookies.has('theme')
  request.cookies.delete('theme');
  request.cookies.has('theme');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Frame-Options', 'SAMEORIGIN');
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
  response.cookies.set({
    name: 'theme',
    value: 'dark',
    path: '/'
  })

  // console.log(response);

  // NextResponse.redirect(new URL("/", request.url)
  return response;
}

export const config = {
  matcher: "/",
}