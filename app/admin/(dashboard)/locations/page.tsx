import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import LocationsHeader from "./_sections/locations-header";
import { LocationsPaginationClient } from "./_sections/locations-pagination-client";
import LocationsTable from "./_sections/locations-table";

export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <LocationsHeader />
      <LocationsTable />
      <LocationsPaginationClient searchParams={searchParams} totalPages={5} redirectURL={redirectURL} />
    </div>
  )
}