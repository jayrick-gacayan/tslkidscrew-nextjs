'use server';

import { revalidatePath } from "next/cache";

export async function revalidateUsers(baseURL: string) {
  revalidatePath(baseURL);
}