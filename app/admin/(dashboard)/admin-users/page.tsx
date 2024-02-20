import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import AdminUsersHeader from "./_sections/admin-users-header";
import AdminUsersTable from "./_sections/admin-users-table";
import type { Metadata } from "next";
import Pagination from "@/app/_components/pagination";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { Paginate } from "@/models/paginate";
import { adminUsers } from "@/services/admin-services";
import { Session } from "next-auth";
import { Result } from "@/models/result";

export const metadata: Metadata = {
  title: 'Admin Users',
  description: 'Admin Users Page'
}

export default async function Page({ searchParams }: { searchParams: SearchParamsProps }) {
  let currentAdmin: Session<Admin> | null = await auth();
  let result: Result<Paginate<Admin>> = await adminUsers(searchParams, currentAdmin?.accessToken);

  let data = result.data?.data ?? [];
  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;
  let totalPages = Math.ceil(result.data?.total ?? 1 / showEntry) ?? 1

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6 relative">
      <AdminUsersHeader searchParams={searchParams}
        showEntry={showEntry}
        redirectURL={redirectURL} />
      <AdminUsersTable data={data} />
      {
        totalPages < 2 ? null :
          (
            <div className="w-fit m-auto block">
              <Pagination baseURL="/admin/admin-users"
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