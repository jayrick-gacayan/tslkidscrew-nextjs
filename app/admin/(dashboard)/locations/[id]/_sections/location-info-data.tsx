import { LocationPlace } from "@/models/location";
import InfoContainer from "../../../_components/info-container";
import { auth } from "@/auth";
import { locationPlace } from "@/services/location-services";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import { Result } from "@/models/result";

export default async function LocationInfoData({ id }: { id: string }) {
  let admin: Session | null = await auth();

  let result: Result<LocationPlace> = await locationPlace(id, admin?.user?.accessToken)

  if (!result.data) { notFound(); }

  let locationPlaceData: LocationPlace = result.data;

  return (
    <div className="bg-secondary p-6">
      <div className="w-full lg:w-6/12 block">
        <InfoContainer label='Name' data={locationPlaceData?.name!} />
        <InfoContainer label='Address' data={locationPlaceData?.address!} />
        <InfoContainer label='Primary Director' data={locationPlaceData?.director?.email! ?? 'N/A'} />
        <InfoContainer label='Minimum Age For Children' data={locationPlaceData?.minimum_age!} />
        <InfoContainer label='Programs' data={locationPlaceData?.program_count ?? 'N/A'} />
      </div>
    </div>
  )
}