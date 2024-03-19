import AdminHeaderWithEntries from "@/app/admin/(dashboard)/_components/admin-header-with-entries"
import BackButtonClient from "@/app/_components/back-button-client"
import InfoContainer from "@/app/_components/info-container"
import { LocationProgram } from "@/models/location-program"
import { Result } from "@/models/result"
import Link from "next/link"
import { notFound } from "next/navigation"
import { currencyFormat } from "@/types/helpers/currency-format"
import { locationProgramAction } from "@/actions/location-program-actions"

export default async function Page({
  params
}: {
  params: {
    id: string;
    program_id: string;
  }
}) {
  let result: Result<LocationProgram> = await locationProgramAction(params.program_id);

  if (!result.data) { notFound(); }

  let locationProgramData: LocationProgram = result.data;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Location Program Information' />
      <div className="bg-secondary p-6">
        <div className="columns-1 lg:columns-2 space-y-4">
          <InfoContainer label='Name' data={locationProgramData.name!} />
          <InfoContainer label='Suffix' data={locationProgramData.name_suffix!} />
          <InfoContainer label='Type' data='Daycare' />
          <InfoContainer label='Status' data={!!locationProgramData.active ? 'Active' : 'Inactive'} />
          <InfoContainer label='Package Activation' data={!!locationProgramData.is_package_active ? 'Active' : 'Inactive'} />
          <InfoContainer label='Subsidized Enrollment Enabled' data={!!locationProgramData.is_package_active ? 'Enabled' : 'Disabled'} />
          <InfoContainer label='Director' data={locationProgramData.director?.email ?? 'N/A'} />
          <InfoContainer label='Capacity' data={locationProgramData.capacity?.toString()} />
          <InfoContainer label='Price' data={currencyFormat('en-US', { style: "currency", currency: 'USD', }, 12.50)} />
        </div>
      </div>
      <div className="w-fit ml-auto block space-x-2">

        <Link href={`/admin/locations/${params.id}/programs/${params.program_id}/edit`}
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          Edit Info
        </Link>
      </div>
    </div>
  )
}