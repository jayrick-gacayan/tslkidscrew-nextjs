import { Admin } from "@/models/admin";
import { Parent } from "@/models/parent";
import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session<T> {
    user: T & DefaultSession['expires'] & { role: string };
    accessToken?: string;
  }
  interface JWT<T> extends T, DefaultJWT {
    accessToken?: string;
  }
}