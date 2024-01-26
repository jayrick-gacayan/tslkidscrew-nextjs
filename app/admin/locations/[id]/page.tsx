import Link from "next/link";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import InfoContainer from "../../_components/info-container";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <AdminHeaderWithEntries headerText='Location Information' />
      <div className="bg-secondary p-6">
        <div className="w-fulll lg:w-6/12 block">
          <InfoContainer label='Name' data='Albany Daycare (Karner Road)' />
          <InfoContainer label='Address' data='Karner Road: Former Pumpkin Patch' />
          <InfoContainer label='Primary Director' data='alexislarose.tsl@gmail.com' />
          <InfoContainer label='Minimum Age For Children' data='3' />
          <InfoContainer label='Programs' data='3' />
        </div>
      </div>
      <div className="w-fit ml-auto block space-x-2">
        <Link href={`/admin/locations/1/programs`}
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          View All Programs
        </Link>
        <Link href={`/admin/locations/1/edit`}
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          Edit Info
        </Link>
      </div>
    </div>
  )
}