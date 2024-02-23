import { LocationPlace } from "@/models/location";
import LocationTableClient from "./location-table-client";

export default function LocationsTable({ locationPlaces }: { locationPlaces: LocationPlace[] }) {

  return (
    <div className={`block overflow-auto rounded bg-secondary h-[448px]`}>
      <table className="min-w-[1024px] w-full">
        <thead>
          <tr className="bg-secondary-light [&>th]:text-sm [&>th]:font-medium [&>th]:px-3 [&>th]:py-2">
            <th className="w-56">NAME</th>
            <th className="w-auto">ADDRESS</th>
            <th className="w-56">PRIMARY DIRECTOR</th>
            <th className="w-24">PROGRAMS</th>
            <th className="w-40">MINIMUM AGE</th>
            <th className="w-24">ACTION</th>
          </tr>
        </thead>
        <LocationTableClient locationPlaces={locationPlaces} />
      </table>
    </div>
  )
}