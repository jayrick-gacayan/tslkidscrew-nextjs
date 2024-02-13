'use server';

import { authSignIn } from "@/actions/auth-actions/auth-actions";

export async function adminLogin(formData: FormData) {
  formData.set('role', 'admin')

  let result = await authSignIn(formData, '/admin/dashboard', true);
}