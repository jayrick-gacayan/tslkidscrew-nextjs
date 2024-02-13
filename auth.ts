import Credentials from "@auth/core/providers/credentials"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config";

export const {
  handlers: {
    GET,
    POST
  },
  auth,
  signIn,
  signOut,
  unstable_update
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {} as any,
      async authorize(credentials, request): Promise<any> {

        let { email, password } = credentials;

        const result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/sign_in`,
          {
            method: "POST",
            body: JSON.stringify({ user: { email, password } }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )

        const response = await result.json();

        if (result.status === 200) {
          let { user: { access_token, ...rest } } = response;
          return {
            ...rest,
            accessToken: response.token
          }
        }
        return null;
      }
    })
  ],
})