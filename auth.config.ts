import type { JWT, NextAuthConfig } from "next-auth";
import { Admin } from "./models/admin";
import { Parent } from "./models/parent";

export const authConfig = {
  callbacks: {

    // async signIn({ user, account, profile, credentials, email }) {
    //   return Promise.resolve(credentials?.callbackUrl as string);
    // },
    // async redirect({ url, baseUrl }) {
    //   return url;
    // },
    async session({ session, user, token, newSession, trigger }) {
      // console.log('token', token.user);
      let { accessToken, ...rest } = token.user as JWT<Admin | Parent>;
      session.user = token.user;
      session.accessToken = accessToken as any;
      // console.log('token', token);
      // console.log('user', user);
      // console.log('session', session);
      // console.log('newSession', newSession);

      return session
    },

    async jwt({ token, user, account, profile, session, trigger }) {
      // console.log('user on jwt', user);
      user && (token.user = user as any);
      // console.log('token', token);
      // console.log('user', user);
      // console.log('account', account);
      // console.log('profile', profile);
      // console.log('session', session);
      return token;
    },

  },
  pages: {
    signIn: '/parent/login'
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
  trustHost: true
} satisfies NextAuthConfig