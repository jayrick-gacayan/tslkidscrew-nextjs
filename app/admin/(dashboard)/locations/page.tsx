import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import LocationsHeader from "./_sections/locations-header";
import LocationsTable from "./_sections/locations-table";
import { SearchParamsProps } from "@/types/props/search-params-props";
import type { Metadata } from "next";
import Pagination from "@/app/_components/pagination";

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Locations Page'
}

export default function Page({ searchParams }: { searchParams: SearchParamsProps; }) {

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil(1 / showEntry) ?? 1;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <LocationsHeader searchParams={searchParams} showEntry={showEntry} redirectURL={redirectURL} />
      <LocationsTable searchParams={searchParams} />
      {/* {
        totalPages < 2 ? null :
          (
            <div className="w-fit m-auto block">
              <Pagination baseURL="/admin/locations"
                currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
                searchParams={searchParams}
                totalPages={totalPages}
              />
            </div>
          )
      } */}
    </div>
  )
}