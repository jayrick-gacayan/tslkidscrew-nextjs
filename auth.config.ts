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
      if (auth?.user === null &&
        (request.nextUrl.href.includes('admin') && !ADMIN_PUBLIC_ROUTES.includes(request.nextUrl.pathname))
      ) {
        return NextResponse.redirect('/admin/login');
      }
      else if (auth?.user === null &&
        (request.nextUrl.href.includes('parent') && !PARENT_PUBLIC_ROUTES.includes(request.nextUrl.pathname))
      ) {
        return NextResponse.redirect('/parent/login');
      }
      else if (auth?.user && request.nextUrl.pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      else if (auth?.user && request.nextUrl.pathname === '/parent/login') {
        return NextResponse.redirect(new URL('/parent/dashboard', request.url))
      }
      else if (isAdmin(auth?.user) && request.nextUrl.pathname.includes('parent')) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      else if (isParent(auth?.user) && request.nextUrl.pathname.includes('admin')) {
        return NextResponse.redirect(new URL('/parent/dashboard', request.url))
      }

      return true;

    },
    async session({ session, user, token, newSession, trigger }) {
      let { accessToken, ...rest } = token;
      session.user = rest as any;
      session.accessToken = accessToken as any;
      // console.log('token', token);
      // console.log('user', user);
      // console.log('session', session);
      // console.log('newSession', newSession);

      return session
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      user && (token = user as any);
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