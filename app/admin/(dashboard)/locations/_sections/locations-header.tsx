'use client';

import { useState } from "react";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import ShowEntriesSelect from "../../_components/show-entries-select";
import Link from "next/link";
import { SearchParamsProps } from "@/types/props/search-params-props";

export default function LocationsHeader({
  searchParams,
  showEntry,
  redirectURL,
}: {
  searchParams: SearchParamsProps;
  showEntry: number;
  redirectURL: (url: string) => Promise<void>
}) {
  let baseURL = "/admin/locations";
  const [entries, setEntries] = useState<number>(showEntry);

  function urlPaginate(searchParams: SearchParamsProps, per_page?: number) {
    let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

    if (urlSearchParams.has('page')) { urlSearchParams.delete('page'); }
    if (!per_page) { urlSearchParams.delete('per_page'); }
    else {
      urlSearchParams.set(
        encodeURIComponent('per_page'),
        encodeURIComponent(per_page)
      );
    }

    return `${baseURL}${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`
  }

  return (
    <AdminHeaderWithEntries headerText='Locations'>
      <div className='flex w-full sm:w-fit items-center gap-4'>
        <ShowEntriesSelect value={entries}
          onChange={(value: any) => {
            redirectURL(urlPaginate(searchParams, value === 10 ? undefined : value));
          }}
          items={[10, 20, 30]} />
        <div className="w-full">
          <Link href='/admin/locations/new'
            className="rounded text-white bg-primary px-4 py-2 text-sm block text-center">
            Create a New Location
          </Link>
        </div>
      </div>
    </AdminHeaderWithEntries>
  )
}