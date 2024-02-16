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

        if (role === 'parent') {
          return {
            id: 1,
            name: 'Parent one',
            email: 'sample@email.com',
            address: 'Cebu City',
            role: 'parent',
            emergencyNumber: '09616182438',
            accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTAsImV4cCI6MTcwODU4MDUxMX0.9K2m44hErfaha010mM7wX_3Juny7jjPUBefZzcMCn6c'
          }
        }
        else if (role === 'admin') {
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
            if (response.status === 200) {
              let { user: { access_token, ...rest } } = response;

              return {
                ...rest,
                role: 'admin',
                accessToken: response.token
              }
            }
            else if (response.status === 300) {
              throw new Error(response.error)
            }
          }
        }

        return null;
      }
    })
  ],
})