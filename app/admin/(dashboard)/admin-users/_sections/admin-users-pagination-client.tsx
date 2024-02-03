'use client';

import Pagination from "@/app/_components/pagination";
import { SearchParamsProps } from "@/types/props/search-params-props";

export function AdminUsersPaginationClient({
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
      <Pagination baseURL="/admin/admin-users"
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