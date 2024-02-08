import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    async authorized({ auth, request }) {

      // if (auth?.user === null &&
      //   (request.nextUrl.href.includes('admin') && request.nextUrl.pathname !== '/admin/login')
      // ) {
      //   return false;
      // }
      // else if (auth?.user === null &&
      //   (request.nextUrl.href.includes('parent') && request.nextUrl.pathname !== '/parent/login')
      // ) {
      //   return false;
      // }

      return true;

    },
  },
  secret: process.env.AUTH_SECRET,
  providers: []
} satisfies NextAuthConfig