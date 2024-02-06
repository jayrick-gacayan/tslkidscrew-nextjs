'use server';

import { Admin } from "@/models/admin";
import { Result } from "@/models/result";
import { revalidatePath } from "next/cache";

export async function updateAdminUser(id: number, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log('rawFormData update', rawFormData, id);

  if (formData.has('name')) {
    return {
      res: { success: true, data: rawFormData }
    };
  }

  return undefined;
}

export async function addAdminUser(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log('rawFormData add', rawFormData);

  if (formData.has('name')) {
    return {
      res: { success: true, data: rawFormData }
    };
  }

  return undefined;
}

export async function revalidateUsers(baseURL: string) {
  revalidatePath(baseURL);
}

export async function adminUsers(
  searchParams: { [key: string]: string | string[] | undefined }
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let result = await fetch(process.env.NEXT_PUBLIC_API_URL + `admins/admin-users${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`)

  let response = await result.json();

  return new Result<Admin[]>({
    ...response,
    statusCode: result.status,
    response: response
  });
}

