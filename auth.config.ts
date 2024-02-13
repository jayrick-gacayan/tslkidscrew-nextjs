import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  callbacks: {

    async authorized({ auth, request }) {
      console.log('auth', auth?.user)
      console.log('request', request.nextUrl);
      if (auth?.user === null &&
        (request.nextUrl.href.includes('admin') && request.nextUrl.pathname !== '/admin/login')
      ) {
        return NextResponse.redirect('/admin/login');
      }
      else if (auth?.user === null &&
        (request.nextUrl.href.includes('parent') && request.nextUrl.pathname !== '/parent/login')
      ) {
        return NextResponse.redirect('/parent/login');
      }
      else if (auth?.user && request.nextUrl.pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      else if (auth?.user && request.nextUrl.pathname === '/parent/login') {
        return NextResponse.redirect(new URL('/parent/dashboard', request.url))
      }

      return NextResponse.next();

    },

    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl, }) {
      // console.log('url', url);
      // console.log('baseUrl', baseUrl);
      return baseUrl
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
  secret: process.env.AUTH_SECRET,
  providers: [],
  trustHost: true
} satisfies NextAuthConfig