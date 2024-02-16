import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import ProgramsHeader from "./_sections/programs-header";
import ProgramsPaginationClient from "./_sections/programs-pagination-client";
import ProgramsTable from "./_sections/programs-table";
import BackButtonClient from "../../../_components/back-button-client";

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

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <ProgramsHeader />
      <ProgramsTable />
      <ProgramsPaginationClient searchParams={searchParams}
        totalPages={5}
        redirectURL={redirectURL}
        locationId={params.id} />
    </div>
  )
}