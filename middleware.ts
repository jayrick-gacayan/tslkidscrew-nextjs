import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";
import { ADMIN_PUBLIC_ROUTES, PARENT_PUBLIC_ROUTES } from "./types/constants/page-routes";
import { isAdmin, isParent } from "./types/helpers/checking-interfaces";

const { auth } = NextAuth(authConfig);
export default auth((req: NextAuthRequest) => {
  let { auth, nextUrl: { pathname, ...rest } } = req;


  if (!req.nextUrl.origin.includes('http://localhost')) {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.json({ message: 'Unauthorized' })
    }
  }

  if (pathname === '/') {
    return NextResponse.next();
  }
  else {
    if (!!auth) {
      console.log('auth', auth.user)
      let { accessToken, role, ...rest } = auth.user;

      if (isAdmin(rest)) {
        if (ADMIN_PUBLIC_ROUTES.includes(pathname) || pathname.includes('parent')) {
          return NextResponse.redirect(`${req.nextUrl.origin}/admin/dashboard`)
        }

        return NextResponse.next();
      }
      else if (isParent(rest)) {
        if (PARENT_PUBLIC_ROUTES.includes(pathname) || pathname.includes('admin')) {
          return NextResponse.redirect(`${req.nextUrl.origin}/admin/dashboard`)
        }

        return NextResponse.next();
      }
    }
    else {
      if (!PARENT_PUBLIC_ROUTES.includes(pathname) && !ADMIN_PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(`${req.nextUrl.origin}/`)
      }
    }
  }

});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}