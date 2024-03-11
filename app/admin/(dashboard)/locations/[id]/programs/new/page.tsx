import BackButtonClient from "@/app/_components/back-button-client"
import NewProgramForm from "./sections/new-program-form"
import type { Metadata } from "next";
import { Result } from "@/models/result";
import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { activeAdminUsers } from "@/services/admin-services";
import { Session } from "next-auth";
import { LocationPlace } from "@/models/location-place";
import { locationPlace } from "@/services/location-services";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Create Location Program',
  description: 'Create Location Program Page'
}

export default async function Page({
  params
}: {
  params: { id: string; }
}) {
  let admin: Session | null = await auth();
  let adminResult: Result<Admin[]> = await activeAdminUsers(admin?.user?.accessToken!);

  let adminData = adminResult.data?.map((admin: Admin) => { return { id: admin.id, email: admin.email } }) ?? []
  let result: Result<LocationPlace> = await locationPlace(params.id, admin?.user?.accessToken)

  if (!result.data) { notFound(); }

  let locationPlaceData: LocationPlace = result.data;

  return (
    <div className="pb-8">
      <div className="rounded bg-white drop-shadow-lg p-4">
        <div className="w-full lg:w-6/12 m-auto block space-y-8">
          <BackButtonClient />
          <h1 className="text-[32px] font-medium text-black">New Program</h1>
          <NewProgramForm activeAdmins={adminData}
            locationPlace={locationPlaceData} />
        </div>
      </div>
    </div>

  )
}