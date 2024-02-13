import { Admin } from "@/models/admin";
import { Parent } from "@/models/parent";
import { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: (Admin | Parent) & DefaultSession['user'];
    accessToken?: string;
  }

  interface JWT extends DefaultJWT, (Admin | Parent) {

  }
}