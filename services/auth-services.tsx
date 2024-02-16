import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";

export async function nextauthSignOut(redirectTo: string) {
  return await signOut({ redirect: false, redirectTo: redirectTo });
}

export async function nextauthSignIn(
  formData: FormData,
  redirectTo: string,
) {
  try {
    let result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      redirect: false,
      redirectTo: redirectTo,
    },);

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message,
      }
    }
  }
}