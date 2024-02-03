'use server';

import { redirectToURL } from "./functions";

export async function redirectURL(url: string) {
  redirectToURL(url, '/parent/dashboard');
}