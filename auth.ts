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

        let { email, password, role } = credentials;
        let env = process.env;

        const result = await fetch(
          (role === 'parent' ? `${env.NEXT_PUBLIC_API_PARENT_URL!}/sign-in` :
            `${env.NEXT_PUBLIC_API_ADMIN_URL!}/sign_in`),
          {
            method: "POST",
            body: JSON.stringify({ [role === 'parent' ? 'customer_user' : 'user']: { email, password } }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )

        try {
          const response = await result.json();

          if (result.status === 200) {
            if (response.status === 200) {

              if (role === 'parent') {
                let { customer_user: { access_token, ...rest }, ...others } = response;
                return {
                  ...rest,
                  role: 'parent',
                  accessToken: access_token
                }
              }
              else if (role === 'admin') {
                let { user: { access_token, ...rest } } = response;

                return {
                  ...rest,
                  role: 'admin',
                  accessToken: response.token
                }
              }

            }
            else if (response.status === 300) {
              throw new Error(response.error)
            }
          }
        }
        catch (error) {
          throw new Error('Something went wrong. Please try again.')
        }

        return null;
      }
    })
  ],
})