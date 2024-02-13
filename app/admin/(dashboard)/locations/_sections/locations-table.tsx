import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location";
import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";
import { locationPlaces } from "@/services/location-services";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { Session } from "next-auth";
import Link from "next/link";


export default async function LocationsTable({ searchParams }: { searchParams: SearchParamsProps }) {
  let admin: Session<Admin> | null = await auth();
  let result: Result<Paginate<LocationPlace>> = await locationPlaces(searchParams, admin?.accessToken)

  let data = result.data?.data ?? [];

  return (
    <div className="block overflow-auto rounded bg-secondary h-96">
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
        <tbody>
          {
            data.map((location: LocationPlace, idx: number) => {
              return (
                <tr key={`locations-table-${location.name!}-${idx}`}
                  className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
                  <td className="w-56">{location.name ?? 'N/A'}</td>
                  <td className="w-auto">{location.address ?? 'N/A'}</td>
                  <td className="w-56">qwerty@gmail.com</td>
                  <td className="w-24">3</td>
                  <td className="w-40">{location.minimum_age!}</td>
                  <td className="w-24">
                    <div className="flex items-center justify-center gap-2 w-full">
                      <Link href={`/admin/locations/${location.id!}`}
                        className="text-primary block">
                        <Fa6SolidEye />
                      </Link>
                      <Link href={`/admin/locations/${location.id!}/edit`}
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