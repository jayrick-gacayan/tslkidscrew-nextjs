import { Session } from "next-auth";
import BackButtonClient from "../../../../../_components/back-button-client";
import { EditFormLocation } from "./_sections/edit-form-location";
import { Admin } from "@/models/admin";
import { auth } from "@/auth";
import { LocationPlace } from "@/models/location";
import { locationPlace } from "@/services/location-services";
import { notFound } from "next/navigation";
import { Result } from "@/models/result";
import { activeAdminUsers } from "@/services/admin-services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit Location',
  description: 'Edit Location Page'
}

export default async function Page({ params }: { params: { id: string; } }) {
  let currentAdmin: Session<Admin> | null = await auth();

  let result: Result<LocationPlace> = await locationPlace(params.id, currentAdmin?.accessToken)

  if (!result.data) { notFound(); }

  let locationPlaceData = result.data;

  let resultData: Result<Admin[]> = await activeAdminUsers(currentAdmin?.accessToken!);

  let data = resultData.data?.map((admin: Admin) => { return { id: admin.id!, email: admin.email! } }) ?? []

  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">Edit Location</h1>
        <EditFormLocation locationPlace={locationPlaceData} admins={data} />
      </div>
    </div>
  )
}