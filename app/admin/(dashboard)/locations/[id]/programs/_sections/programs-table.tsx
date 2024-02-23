import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import { LocationProgram } from "@/models/location-program";
import Link from "next/link";

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
        <tbody>
          {
            locationPrograms.map((locationProgram: LocationProgram, index: number) => {
              let activeProgram = locationProgram.active === undefined || locationProgram.active ?
                'Active' : 'Inactive';
              return (
                <tr key={`location-program-${locationProgram.id}-${index}-${locationProgram.name}`}
                  className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
                  <td className="w-auto">{locationProgram.name!}</td>
                  <td className="w-48">{locationProgram.name_suffix === '' ? 'N/A' : locationProgram.name_suffix}</td>
                  <td className="w-72">rhay26.tsl@gmail.com</td>
                  <td className="w-24">
                    {activeProgram}
                  </td>
                  <td className="w-40">{locationProgram.capacity ?? 1}</td>
                  <td className="w-40">12</td>
                  <td className="w-24">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <Link href={`/admin/locations/${location_id}/programs/${locationProgram.id!}`}
                        className="text-primary block">
                        <Fa6SolidEye />
                      </Link>
                      <Link href={`/admin/locations/${location_id}/programs/${locationProgram.id!}/edit`}
                        className="text-warning block">
                        <Fa6SolidPen />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}