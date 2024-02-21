import { Admin } from "@/models/admin";
import AdminUsersTableClient from "./admin-users-table-client";

export default function AdminUsersTable({ admins }: {
  admins: Admin[]
}) {

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
        <AdminUsersTableClient admins={admins} />
      </table>
    </div>
  )
}