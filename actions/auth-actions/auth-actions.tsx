'use server'

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth";

export async function authSignOut(redirectTo: string, redirect: boolean) {
  let result: Promise<any> = await signOut({
    redirect, redirectTo
  });

  return;
}

export async function authSignIn(
  formData: FormData,
  redirectTo: string,
  redirect: boolean,
) {
  try {
    let result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      redirect,
      redirectTo
    },);

    console.log('result', result);
  } catch (error) {
    if (error instanceof AuthError) // Handle auth errors
      throw error // Rethrow all other errors
  }
}