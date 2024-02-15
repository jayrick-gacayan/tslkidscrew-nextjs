import Link from "next/link";
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import EditAdminUserButton from "./edit-admin-user-button";
import { Admin } from "@/models/admin";
import { Result } from "@/models/result";
import { Paginate } from "@/models/paginate";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { adminUsers } from "@/services/admin-services";
import { auth } from "@/auth";
import { Session } from "next-auth";
import AdminUserInactiveButton from "./admin-inactive-user-button";
import AdminUsersTableClient from "./admin-users-table-client";

export default async function AdminUsersTable({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  let currentAdmin: Session<Admin> | null = await auth();
  let result: Result<Paginate<Admin>> = await adminUsers(searchParams, currentAdmin?.accessToken);

  let data = result.data?.data ?? [];

  return (
    <div className="block overflow-auto rounded bg-secondary h-[476px] relative">
      <table className="min-w-[1024px] w-full">
        <thead>
          <tr className="bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black">
            <th className="w-56">EMAIL</th>
            <th className="w-auto">NAME</th>
            <th className="w-12">ACTIVE</th>
            <th className="w-48">SUPER ADMIN</th>
            <th className="w-48">CREATED AT</th>
            <th className="w-48">LAST SIGNED IN</th>
            <th className="w-32">ACTION</th>
          </tr>
        </thead>
        <AdminUsersTableClient admins={data} />
      </table>
    </div>
  )
}