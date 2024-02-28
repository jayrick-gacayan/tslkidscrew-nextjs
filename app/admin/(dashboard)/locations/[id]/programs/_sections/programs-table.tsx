import { LocationProgram } from "@/models/location-program";
import ProgramsTableClient from "./programs-table-client";

export default function ProgramsTable({
  location_id,
  locationPrograms
}: {
  location_id: string;
  locationPrograms: LocationProgram[];
}) {
  return (
    <div className="block overflow-auto rounded bg-secondary h-96">
      <table className="min-w-[1024px] w-full">
        <thead>
          <tr className="bg-secondary-light [&>th]:text-sm [&>th]:font-medium [&>th]:px-3 [&>th]:py-2">
            <th className="w-auto">NAME</th>
            <th className="w-48">NAME SUFFIX</th>
            <th className="w-72">DIRECTOR</th>
            <th className="w-24">STATUS</th>
            <th className="w-40">CAPACITY</th>
            <th className="w-40">ENROLLED</th>
            <th className="w-24">ACTION</th>
          </tr>
        </thead>
        <ProgramsTableClient location_id={location_id} programs={locationPrograms} />
      </table>
    </div>
  )
}