'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { RedirectType, redirect } from 'next/navigation';

export async function pathRevalidate(baseURL: string) {
  revalidatePath(baseURL);
}

export async function redirectToURL(url: string, baseURL: string) {
  revalidatePath(baseURL);
  redirect(url);
}

export async function redirectToPath(redirectURL: string, type?: RedirectType) {
  redirect(redirectURL, type);
}

export async function tagRevalidate(tag: string) {
  revalidateTag(tag);
}