import { LocationPlace } from "@/models/location-place";
import InfoContainer from "../../../../../_components/info-container";
import { notFound } from "next/navigation";
import { Result } from "@/models/result";
import { locationPlaceAction } from "@/actions/location-actions";

export default async function LocationInfoData({ id }: { id: string }) {
  let result: Result<LocationPlace> = await locationPlaceAction(id);

  if (!result.data) { notFound(); }

  let locationPlaceData: LocationPlace = result.data;

  return (
    <div className="bg-secondary p-6">
      <div className="w-full lg:w-6/12 block">
        <InfoContainer label='Name' data={locationPlaceData?.name!} />
        <InfoContainer label='Address' data={locationPlaceData?.address!} />
        <InfoContainer label='Primary Director' data={locationPlaceData?.director?.email! ?? 'N/A'} />
        <InfoContainer label='Minimum Age For Children' data={locationPlaceData?.minimum_age!} />
        <InfoContainer label='Programs' data={locationPlaceData?.programs_count ?? 'N/A'} />
      </div>
    </div>
  )
}