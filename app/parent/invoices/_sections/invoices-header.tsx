'use client';

import ShowEntriesSelect from "@/app/_components/show-entries-select";
import { SearchParamsProps } from "@/types/props/search-params-props";

export default function InvoicesHeader({
  showEntry,
  searchParams,
  redirectURL,
}: {
  searchParams: SearchParamsProps;
  showEntry: number;
  redirectURL: (url: string) => Promise<void>;
}) {
  let baseURL = "/parent/invoices";

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
    <div className="flex sm:flex-row flex-col gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 text-black">
        <h1 className="font-medium text-[24px]">My Invoices</h1>
      </div>
      <div className="flex-none sm:w-auto w-full">
        <ShowEntriesSelect value={showEntry} items={[10, 20, 30]}
          onChange={(value) => {
            redirectURL(urlPaginate(searchParams, value === 10 ? undefined : value));
          }} />
      </div>
    </div>
  )
}