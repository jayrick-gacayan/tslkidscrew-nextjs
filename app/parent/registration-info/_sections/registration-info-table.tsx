
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import TableEmptyData from "@/app/_components/table-empty-data";
import SomethingWentWrongClient from "@/app/_components/table-something-went-wrong-client";
import { RegistrationRecord } from "@/models/registration-record";
import { dateString } from "@/types/helpers/date-helpers";
import Link from "next/link";

export default function RegistrationInfoTable({
  registration_records
}: {
  registration_records: RegistrationRecord[] | undefined
}) {
  return (
    <div className='block overflow-auto rounded bg-secondary min-h-[512px] h-full'>
      <table className={`min-w-[1024px] w-full
        ${(!registration_records || registration_records.length === 0 || registration_records.length > 10) ? 'h-full min-h-[512px]' : 'h-auto'}`}>
        <thead>
          <tr className="bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black">
            <th className="w-auto">Program</th>
            <th className="w-72">REGISTRATION DATE</th>
            <th className="w-72">ENROLLMENT ACTIVE</th>
            <th className="w-32">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {
            !registration_records ? (<SomethingWentWrongClient />) :
              registration_records.length === 0 ? (<TableEmptyData colSpan={4} />) :
                <>
                  {
                    registration_records.map((registration_record: RegistrationRecord, index: number) => {
                      let { id, program, date, is_active } = registration_record;

                      let enrollActive: 'Active' | 'Inactive' = (is_active === undefined || !is_active) ? 'Inactive' : 'Active';

                      return (
                        <tr key={`registration-record-data-${id}-${index}`}
                          className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
                          <td className="w-auto">{program ?? 'N/A'}</td>
                          <td className="w-72">
                            {dateString(date!, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="w-72">{enrollActive}</td>
                          <td className="w-32">
                            <div className="flex items-center justify-center w-full gap-2">
                              <Link href={`/parent/registration-info/${id}`}
                                className="text-primary block cursor-pointer">
                                <Fa6SolidEye />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </>
          }
        </tbody>
      </table>
    </div>
  )
}