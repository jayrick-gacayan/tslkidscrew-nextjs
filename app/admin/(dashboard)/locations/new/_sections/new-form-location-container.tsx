import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { activeAdminUsers } from "@/services/admin-services";
import { Session } from "next-auth";
import { NewFormLocation } from "./new-form-location";
import { Result } from "@/models/result";

export default async function NewFormLocationContainer() {
  let currentAdmin: Session<Admin> | null = await auth();
  let result: Result<Admin[]> = await activeAdminUsers(currentAdmin?.accessToken!);

  let data = result.data?.map((admin: Admin) => { return { id: admin.id!, email: admin.email! } }) ?? []

  return (<NewFormLocation admins={data} />)
}