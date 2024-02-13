import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import AdminUsersHeader from "./_sections/admin-users-header";
import { AdminUsersPaginationClient } from "./_sections/admin-users-pagination-client";
import AdminUsersTable from "./_sections/admin-users-table";

export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  let showEntry = typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 10;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <AdminUsersHeader searchParams={searchParams}
        showEntry={showEntry}
        redirectURL={redirectURL} />
      <AdminUsersTable searchParams={searchParams} />
      <AdminUsersPaginationClient searchParams={searchParams}
        totalPages={Math.ceil(1 / showEntry) ?? 1}
        redirectURL={redirectURL} />
    </div>
  )
}