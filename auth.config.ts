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
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, }) {
      return token
    }


  },
  secret: process.env.AUTH_SECRET,
  providers: [],
  trustHost: true
} satisfies NextAuthConfig