'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function parentLogin(prevState: any, formData: FormData) {

  redirect('/parent/dashboard');
  // try {
  //   let result = await signIn('credentials', {
  //     email: formData.get('email'),
  //     password: formData.get('password'),
  //   });

  //   console.log('result', result);
  // } catch (error) {
  //   if (error instanceof AuthError) // Handle auth errors
  //     throw error // Rethrow all other errors
  // }
}