import { auth } from "@/auth";
import BackButtonClient from "../../_components/back-button-client";
import { NewFormLocation } from "./_sections/new-form-location";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import type { Metadata } from "next";
import { Result } from "@/models/result";
import { activeAdminUsers } from "@/services/admin-services";

export const metadata: Metadata = {
  title: 'Create Location',
  description: 'Create Location Page'
}

export default async function Page() {
  let currentAdmin: Session<Admin> | null = await auth();
  let result: Result<Admin[]> = await activeAdminUsers(currentAdmin?.accessToken!);

  let data = result.data?.map((admin: Admin) => { return { id: admin.id!, email: admin.email! } }) ?? []

  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">New Location</h1>
        <NewFormLocation admins={data} />
      </div>
    </div>
  )
}