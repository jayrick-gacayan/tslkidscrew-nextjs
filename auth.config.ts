import type { JWT, NextAuthConfig } from "next-auth";
import { Admin } from "./models/admin";
import { Parent } from "./models/parent";

export const authConfig = {
  callbacks: {
    async session({ session, user, token, newSession, trigger }) {
      // console.log('token', token.user);
      let { accessToken, ...rest } = token.user as JWT<Admin | Parent>;
      session.user = token.user;
      session.accessToken = accessToken as any;
      console.log('token on session', token.user);
      // console.log('user', user);
      // console.log('session', session);
      // console.log('newSession', newSession);

      return session
    },

    async jwt({ token, user, account, profile, session, trigger, }) {
      // console.log('user on jwt', user);
      user && (token.user = user as any);
      console.log('token on jwt', token);
      console.log('user on jwt', user);
      // console.log('account', account);
      // console.log('profile', profile);
      // console.log('session', session);

      if (trigger === 'update') {
        token.user = { ...(token.user as any), ...session }
      }
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