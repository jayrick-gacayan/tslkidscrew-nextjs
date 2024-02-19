'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function pathRevalidate(baseURL: string) {
  revalidatePath(baseURL);
}

export async function redirectToURL(url: string, baseURL: string) {
  revalidatePath(baseURL);
  redirect(url);
}

export async function redirectToPath(redirectURL: string) {
  redirect(redirectURL);
}