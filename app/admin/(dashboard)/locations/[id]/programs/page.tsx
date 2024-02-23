import ProgramsHeader from "./_sections/programs-header";
import ProgramsTable from "./_sections/programs-table";
import BackButtonClient from "../../../../../_components/back-button-client";
import Pagination from "@/app/_components/pagination";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { Session } from "next-auth";
import { locationPrograms } from "@/services/location-program-services";
import { redirectToPath } from "@/actions/common-actions";

export const metadata: Metadata = {
  title: 'Location Programs',
  description: 'Location Programs Page'
}

export default async function Page({
  params,
  searchParams
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined; };
}) {
  let admin: Session<Admin> | null = await auth();
  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;


  let result = await locationPrograms(searchParams, params.id, admin?.accessToken!);
  let totalPages = Math.ceil((result?.data?.total ?? 1) / showEntry) ?? 1
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <ProgramsHeader location_id={params.id}
        searchParams={searchParams}
        showEntry={showEntry}
        redirectURL={redirectToPath} />
      <ProgramsTable location_id={params.id}
        locationPrograms={result.data?.data ?? []} />
      {
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
      }
    </div>
  )
}