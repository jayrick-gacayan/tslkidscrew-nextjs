'use client';

import Pagination from "@/app/_components/pagination";
import { SearchParamsProps } from "@/types/props/search-params-props";

export default function ProgramsPaginationClient({
  searchParams,
  totalPages,
  redirectURL,
  locationId
}: {
  searchParams: SearchParamsProps;
  totalPages: number;
  redirectURL: (url: string) => Promise<void>;
  locationId: string;
}) {
  return (
    <div className="w-fit m-auto block">
      <Pagination baseURL={`/admin/locations/${locationId}/programs`}
        currentPage={typeof searchParams.page === 'string' ? searchParams.page : undefined}
        searchParams={searchParams}
        totalPages={totalPages}
        onButtonClick={(url: string) => {
          redirectURL(url);
        }}
      />
    </div>
  )
}