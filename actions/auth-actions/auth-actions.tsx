'use server'

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authSignOut(redirectTo: string) {
  await signOut({ redirect: false });

  redirect(redirectTo);
}

export async function authSignIn(
  formData: FormData,
) {
  try {
    let result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    });

    return result;
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: error.cause?.err?.message,
      }
    }
  }
}