import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { isAdmin, isParent } from "./types/helpers/checking-interfaces";
import {
  ADMIN_PUBLIC_ROUTES,
  PARENT_PUBLIC_ROUTES
} from "./types/constants/page-routes";

export const authConfig = {
  callbacks: {
    async authorized({ auth, request }) {
      // console.log('auth', auth?.user)
      // console.log('request', request.nextUrl);
      let { nextUrl: { pathname, href } } = request;
      if (auth?.user === null && (href.includes('admin') && !ADMIN_PUBLIC_ROUTES.includes(pathname))
      ) {
        return NextResponse.redirect('/admin/login');
      }
      else if (auth?.user === null && (href.includes('parent') && !PARENT_PUBLIC_ROUTES.includes(pathname))
      ) {
        return NextResponse.redirect('/parent/login');
      }
      else if (auth?.user && ADMIN_PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      else if (auth?.user && PARENT_PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/parent/dashboard', request.url))
      }
      else if (isAdmin(auth?.user) && pathname.includes('parent')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      else if (isParent(auth?.user) && pathname.includes('admin')) {
        return NextResponse.redirect(new URL('/parent/dashboard', request.url))
      }

      return true;

    },
    async session({ session, user, token, newSession, trigger }) {
      console.log('token', token.user);
      let { accessToken, ...rest } = token.user as any;
      session.user = token.user;
      session.accessToken = accessToken as any;
      // console.log('token', token);
      // console.log('user', user);
      // console.log('session', session);
      // console.log('newSession', newSession);

      return session
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      console.log('user on jwt', user);
      user && (token.user = user as any);
      // console.log('token', token);
      // console.log('user', user);
      // console.log('account', account);
      // console.log('profile', profile);
      // console.log('session', session);
      return token;
    }
  },
  pages: {
    signIn: '/parent/login'
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
  trustHost: true
} satisfies NextAuthConfig