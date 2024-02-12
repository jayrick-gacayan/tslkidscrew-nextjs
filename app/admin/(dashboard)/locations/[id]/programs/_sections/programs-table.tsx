import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import Link from "next/link";

export default function ProgramsTable() {
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
          <tr className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
            <td className="w-auto">Day Care</td>
            <td className="w-48">n/a</td>
            <td className="w-72">rhay26.tsl@gmail.com</td>
            <td className="w-24">Active</td>
            <td className="w-40">50</td>
            <td className="w-40">12</td>
            <td className="w-24">
              <div className="flex items-center justify-center gap-2 w-full">
                <Link href='/admin/locations/1/programs/1'
                  className="text-primary block">
                  <Fa6SolidEye />
                </Link>
                <Link href='/admin/locations/1/programs/1/edit'
                  className="text-warning block">
                  <Fa6SolidPen />
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}