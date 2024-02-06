import { Admin } from "@/models/admin";
import { Result } from "@/models/result";
import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import { adminUsers } from "./_actions/admin-user-actions";
import AdminUsersHeader from "./_sections/admin-users-header";
import { AdminUsersPaginationClient } from "./_sections/admin-users-pagination-client";
import AdminUsersTable from "./_sections/admin-users-table";


export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  let result: Result<Admin[]> = await adminUsers(searchParams);


  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <AdminUsersHeader />
      <AdminUsersTable adminUsers={result.data ?? []} />
      <AdminUsersPaginationClient searchParams={searchParams} totalPages={5} redirectURL={redirectURL} />
    </div>
  )
}