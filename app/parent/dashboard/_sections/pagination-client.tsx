'use client';

import Pagination from "@/app/_components/pagination";
import { SearchParamsProps } from "@/types/props/search-params-props";

export default function PaginationClient({
  searchParams,
  totalPages,
  redirectURL,
}: {
  searchParams: SearchParamsProps;
  totalPages: number;
  redirectURL: (url: string) => Promise<void>
}) {

  return (
    <div className="w-fit m-auto block">
      <Pagination baseURL="/parent/dashboard"
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