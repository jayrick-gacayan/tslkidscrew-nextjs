import AdminHeaderWithEntries from "@/app/admin/(dashboard)/_components/admin-header-with-entries"
import BackButtonClient from "@/app/admin/(dashboard)/_components/back-button-client"
import InfoContainer from "@/app/admin/(dashboard)/_components/info-container"
import Link from "next/link"

export default function Page(props: any) {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Location Program Information' />
      <div className="bg-secondary p-6">
        <div className="w-6/12 block">
          <InfoContainer label='Name' data='Daycare Custom' />
          <InfoContainer label='Suffix' data='n/a' />
          <InfoContainer label='Type' data='Daycare' />
          <InfoContainer label='Director' data='alexislarose.tsl@gmail.com' />
          <InfoContainer label='Capacity' data='3' />
          <InfoContainer label='Price'
            data={`${Intl.NumberFormat('en-US', {
              style: "currency",
              currency: 'USD',
            }).format(12.50)}`} />
        </div>
      </div>
      <div className="w-fit ml-auto block space-x-2">

        <Link href={`/admin/locations/1/programs/1/edit`}
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          Edit Info
        </Link>
      </div>
    </div>
  )
}