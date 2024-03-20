import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextAuthRequest } from 'next-auth/lib';
import { NextResponse } from 'next/server';
import { ADMIN_PUBLIC_ROUTES, PARENT_PUBLIC_ROUTES } from './types/constants/page-routes';

const { auth } = NextAuth(authConfig);

export default auth((req: NextAuthRequest) => {
  let { auth, nextUrl: { pathname, ...rest } } = req;

  // console.log('sdafsdfsd', req.auth);
  // console.log('process.env.nodeenv', process.env.NODE_ENV)

  if (!req.nextUrl.origin.includes('http://localhost')) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.json({ message: 'Unauthorized' })
    }
  }

  if (pathname === '/') {
    return NextResponse.redirect(`${req.nextUrl.origin}/parent/login`);
  }
  else {
    if (!!auth) {
      let { accessToken, role, ...rest } = auth.user;

      if (role === 'admin') {
        if (ADMIN_PUBLIC_ROUTES.includes(pathname) || pathname.includes('parent')) {
          return NextResponse.redirect(`${req.nextUrl.origin}/admin/dashboard`);
        }

        return NextResponse.next();
      }
      else if (role === 'parent') {

        if (PARENT_PUBLIC_ROUTES.includes(pathname) || pathname.includes('admin')) {
          if (!rest.first_name) {
            return NextResponse.redirect(`${req.nextUrl.origin}/parent/customer-info`);
          }

          return NextResponse.redirect(`${req.nextUrl.origin}/parent/dashboard`);
        }
        else {
          if (!rest.first_name && !req.nextUrl.pathname.includes('customer-info')) {
            return NextResponse.redirect(`${req.nextUrl.origin}/parent/customer-info`);
          }

          return NextResponse.next();
        }
      }
    }
    else {
      if (!PARENT_PUBLIC_ROUTES.includes(pathname) && !ADMIN_PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(`${req.nextUrl.origin}/`);
      }
    }
  }

});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}