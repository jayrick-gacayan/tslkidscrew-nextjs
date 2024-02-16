import { LocationPlace } from "@/models/location";
import InfoContainer from "../../../_components/info-container";

export default function LocationInfoData({ locationPlace }: { locationPlace: LocationPlace }) {
  return (
    <div className="bg-secondary p-6">
      <div className="w-fulll lg:w-6/12 block">
        <InfoContainer label='Name' data={locationPlace.name} />
        <InfoContainer label='Address' data={locationPlace.address} />
        <InfoContainer label='Primary Director' data={locationPlace.director?.email ?? 'N/A'} />
        <InfoContainer label='Minimum Age For Children' data={locationPlace.minimum_age} />
        <InfoContainer label='Programs' data={locationPlace?.program_count ?? 'N/A'} />
      </div>
    </div>
  )
}