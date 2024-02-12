import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import Link from "next/link";

export default function RegistrationInfoTable() {
  return (
    <>
      <div className="block overflow-auto rounded bg-secondary h-96">
        <table className="min-w-[1024px] w-full">
          <thead>
            <tr className="bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black">
              <th className="w-auto">Program</th>
              <th className="w-72">REGISTRATION DATE</th>
              <th className="w-72">ENROLLMENT ACTIVE</th>
              <th className="w-32">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
              <td className="w-auto">North Colonie After School</td>
              <td className="w-72">false</td>
              <td className="w-72">{new Date('02/28/18 01:00 AM').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>

              <td className="w-32">
                <div className="flex items-center justify-center w-full gap-2">
                  <Link href='/parent/dashboard/1'
                    className="text-primary block cursor-pointer">
                    <Fa6SolidEye />
                  </Link>

                </div>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}