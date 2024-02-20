'use server';

import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";

export async function updateSummerCampWeekSetting(
  prevState: any,
  formData: FormData
) {
  let admin: Session<Admin> | null = await auth();
  console.log('date', formData.get('start-date'))
  const rawFormData = Object.fromEntries(formData.entries());

  console.log('result', rawFormData);

}