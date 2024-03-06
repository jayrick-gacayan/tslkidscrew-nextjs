import Link from "next/link";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import BackButtonClient from "../../../../_components/back-button-client";
import LocationInfoData from "./_sections/location-info-data";

export default function Page({ params }: { params: { id: string; } }) {

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Location Information' />
      <LocationInfoData id={params.id} />
      <div className="w-fit ml-auto block space-x-2">
        <Link href={`/admin/locations/${params.id}/programs`}
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          View All Programs
        </Link>
        <Link href={`/admin/locations/${params.id}/edit`}
          className="w-fit px-4 py-2 rounded bg-primary text-white">
          Edit Info
        </Link>
      </div>
    </div>
  )
}