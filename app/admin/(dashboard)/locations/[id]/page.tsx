import Link from "next/link";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import InfoContainer from "../../_components/info-container";
import BackButtonClient from "../../_components/back-button-client";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { Admin } from "@/models/admin";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location";
import { locationPlace } from "@/services/location-services";
import { notFound } from "next/navigation";
import LocationInfoData from "./_sections/location-info-data";

export default async function Page({
  params
}: {
  params: { id: string; }
}) {
  let currentAdmin: Session<Admin> | null = await auth();

  let result: Result<LocationPlace> = await locationPlace(params.id, currentAdmin?.accessToken)

  if (!result.data) { notFound(); }

  let locationPlaceData = result.data;
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Location Information' />
      <LocationInfoData locationPlace={locationPlaceData} />
      <div className="w-fit ml-auto block space-x-2">
        <Link href='/admin/locations/1/programs'
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          View All Programs
        </Link>
        <Link href='/admin/locations/1/edit'
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          Edit Info
        </Link>
      </div>
    </div>
  )
}