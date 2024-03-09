import { DefaultSession, User as NextAuthUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User<T> extends NextAuthUser {
    accessToken?: string;
    role: string;
  }
}