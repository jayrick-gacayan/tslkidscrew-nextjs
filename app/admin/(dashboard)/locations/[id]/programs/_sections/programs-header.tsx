'use client';

import Link from "next/link";
import AdminHeaderWithEntries from "@/app/admin/(dashboard)/_components/admin-header-with-entries";
import ShowEntriesSelect from "@/app/_components/show-entries-select";
import { SearchParamsProps } from "@/types/props/search-params-props";

export default function ProgramsHeader({
  location_id,
  searchParams,
  showEntry,
  redirectURL,
}: {
  location_id: string;
  searchParams: SearchParamsProps;
  showEntry: number;
  redirectURL: (url: string) => Promise<void>
}) {
  let baseURL = `/admin/locations/${location_id}/programs`;

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
    <AdminHeaderWithEntries headerText='Programs'>
      <div className='flex w-fit items-center gap-4'>
        <ShowEntriesSelect value={showEntry}
          onChange={(value) => {
            redirectURL(urlPaginate(searchParams, value === 10 ? undefined : value));
          }} items={[10, 20, 30]} />
        <div>
          <Link href={`/admin/locations/${location_id}/programs/new`}
            className="rounded text-white bg-primary px-4 py-2 text-sm block text-center">
            Create a New Program
          </Link>
        </div>
      </div>
    </AdminHeaderWithEntries>
  )
}