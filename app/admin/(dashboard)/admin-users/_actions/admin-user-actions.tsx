'use server';

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { adminUserInactive } from "@/services/admin-services";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

export async function revalidateUsers(baseURL: string) {
  revalidatePath(baseURL);
}

export async function inactiveAdminUser(id: number) {
  let admin: Session<Admin> | null = await auth();

  let result = await adminUserInactive(id, admin?.accessToken!);
  revalidatePath('/admin/admin-users');
}