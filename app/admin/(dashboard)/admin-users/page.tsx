import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import AdminUsersHeader from "./_sections/admin-users-header";
import { AdminUsersPaginationClient } from "./_sections/admin-users-pagination-client";
import AdminUsersTable from "./_sections/admin-users-table";

export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <AdminUsersHeader />
      <AdminUsersTable />
      <AdminUsersPaginationClient searchParams={searchParams} totalPages={5} redirectURL={redirectURL} />
    </div>
  )
}