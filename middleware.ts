import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth((req: NextAuthRequest) => {

  if (!req.nextUrl.origin.includes('http://localhost')) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.json({})
    }
  }
});

export const config = {
  matcher: ["/api/auth"],
}