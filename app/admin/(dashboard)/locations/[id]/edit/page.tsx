import { Session } from "next-auth";
import BackButtonClient from "../../../_components/back-button-client";
import { EditFormLocation } from "./_sections/edit-form-location";
import { Admin } from "@/models/admin";
import { auth } from "@/auth";
import { LocationPlace } from "@/models/location";
import { locationPlace } from "@/services/location-services";
import { notFound } from "next/navigation";
import { Result } from "@/models/result";

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
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">Edit Location</h1>
        <EditFormLocation locationPlace={locationPlaceData} />
      </div>
    </div>
  )
}