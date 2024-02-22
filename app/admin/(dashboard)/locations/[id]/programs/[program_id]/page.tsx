import AdminHeaderWithEntries from "@/app/admin/(dashboard)/_components/admin-header-with-entries"
import BackButtonClient from "@/app/_components/back-button-client"
import InfoContainer from "@/app/admin/(dashboard)/_components/info-container"
import { auth } from "@/auth"
import { Admin } from "@/models/admin"
import { LocationProgram } from "@/models/location-program"
import { Result } from "@/models/result"
import { locationProgram } from "@/services/location-program-services"
import { Session } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({
  params
}: {
  params: {
    id: string;
    program_id: string;
  }
}) {
  let currentAdmin: Session<Admin> | null = await auth();

  let result: Result<LocationProgram> = await locationProgram(params.program_id, currentAdmin?.accessToken!);

  if (!result.data) { notFound(); }

  let locationProgramData = result.data;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Location Program Information' />
      <div className="bg-secondary p-6">
        <div className="w-6/12 block">
          <InfoContainer label='Name' data={locationProgramData.name!} />
          <InfoContainer label='Suffix' data='n/a' />
          <InfoContainer label='Type' data='Daycare' />
          <InfoContainer label='Director' data='alexislarose.tsl@gmail.com' />
          <InfoContainer label='Capacity' data={locationProgramData.capacity?.toString()} />
          <InfoContainer label='Price'
            data={`${Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(12.50)}`} />
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