import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextAuthRequest } from "next-auth/lib";

const { auth } = NextAuth(authConfig);
export default auth((req: NextAuthRequest) => {
  // const isLoggedIn = !!req.auth;

  // console.log('Route', req.nextUrl);
  // console.log('is logged in', isLoggedIn)
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}