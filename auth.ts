import Credentials from "@auth/core/providers/credentials"
import NextAuth, { DefaultSession } from "next-auth"
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      firstName?: string | null;
      lastName?: string | null;
    } & DefaultSession['user'];
    accessToken?: string;
  }

}

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
      credentials: {},
      async authorize(credentials, request) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        // if (!response.ok) return null
        // return await response.json() ?? null
      }
    })
  ],

  // pages: {
  //   signIn: '/admin/login'
  // },
  // callbacks: {
  //   jwt: async ({ token, user, trigger, session }) => {
  //     user && (token.user = user);
  //     if (trigger === "update") {
  //       return session
  //     }
  //     return token;
  //   },
  //   session: async ({ session, token, trigger, newSession }) => {
  //     session.user = (token.user as any).user as any

  //     return session;
  //   },
  //   signIn: async () => {
  //     return Promise.resolve(true);
  //   },
  // },
})