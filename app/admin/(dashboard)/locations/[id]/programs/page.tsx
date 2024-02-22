import ProgramsHeader from "./_sections/programs-header";
import ProgramsTable from "./_sections/programs-table";
import BackButtonClient from "../../../../../_components/back-button-client";
import Pagination from "@/app/_components/pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Location Programs',
  description: 'Location Programs Page'
}

export default function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined; };
}) {

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil(1 / showEntry) ?? 1


  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <ProgramsHeader />
      <ProgramsTable />
      {/* {
        totalPages < 2 ? null :
          (
            <div className="w-fit m-auto block">
              <Pagination baseURL={`/admin/locations/${params.id}/programs`}
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