import RegistrationInfoHeader from "./_sections/registration-info-header";
import RegistrationInfoTable from "./_sections/registration-info-table";
import { SearchParamsProps } from "@/types/props/search-params-props";
import PaginationClient from "./_sections/pagination-client";
import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import { auth } from "@/auth";
import { Parent } from "@/models/parent";
import { Session } from "next-auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Parent Dashboard',
  description: 'Parent Dashboard Page'
}

export default async function Page({ searchParams }: { searchParams: SearchParamsProps; }) {
  let data: Session<Parent> | null = await auth();

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <RegistrationInfoHeader />
      <RegistrationInfoTable />
      <PaginationClient searchParams={searchParams} totalPages={5} redirectURL={redirectURL} />
    </div>
  )
}