import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import LocationsHeader from "./_sections/locations-header";
import { LocationsPaginationClient } from "./_sections/locations-pagination-client";
import LocationsTable from "./_sections/locations-table";
import { SearchParamsProps } from "@/types/props/search-params-props";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Locations Page'
}

export default function Page({ searchParams }: { searchParams: SearchParamsProps; }) {

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <LocationsHeader searchParams={searchParams} showEntry={showEntry} redirectURL={redirectURL} />
      <LocationsTable searchParams={searchParams} />
      <LocationsPaginationClient searchParams={searchParams} totalPages={5} redirectURL={redirectURL} />
    </div>
  )
}