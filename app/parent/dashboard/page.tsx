import RegistrationInfoHeader from "./_sections/registration-info-header";
import RegistrationInfoTable from "./_sections/registration-info-table";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { auth } from "@/auth";
import { Parent } from "@/models/parent";
import { Session } from "next-auth";
import Pagination from "@/app/_components/pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Parent Dashboard',
  description: 'Parent Dashboard Page'
}

export default async function Page({ searchParams }: { searchParams: SearchParamsProps; }) {
  let data: Session<Parent> | null = await auth();

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil(1 / showEntry) ?? 1

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <RegistrationInfoHeader />
      <RegistrationInfoTable />
      {
        totalPages < 2 ? null :
          (
            <div className="w-fit m-auto block">
              <Pagination baseURL="/parent/dashboard"
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