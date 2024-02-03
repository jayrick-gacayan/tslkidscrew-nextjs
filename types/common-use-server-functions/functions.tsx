import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export function redirectToURL(url: string, baseURL: string) {
  revalidatePath(baseURL);
  redirect(url);
}