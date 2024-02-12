import Link from "next/link";
import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import EditAdminUserButton from "./edit-admin-user-button";
import { Admin } from "@/models/admin";
import { Result } from "@/models/result";
import { Paginate } from "@/models/paginate";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { adminUsers as userAdmins } from "@/services/admin_services";

export default async function AdminUsersTable({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  // let result: Result<Paginate<Admin>> = await userAdmins(searchParams);

  return (
    <div className="block overflow-auto rounded bg-secondary h-[476px]">
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
        <tbody>
          {
            ([{
              id: 1,
              email: 'deanver@kodakollectiv.com',
              name: 'Deanver',
              is_active: false,
              is_super_admin: false,
              created_at: '02/09/2024',
              updated_at: '02/09/2024',
            }]).map((admin: Admin, idx: number) => {
              return (
                <tr key={`admin-users-table-${admin.name!}-${idx}`}
                  className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
                  <td className="w-56">{admin.email}</td>
                  <td className="w-auto">{admin.name}</td>
                  <td className="w-12">
                    {
                      admin.is_active === undefined ? 'No' :
                        admin.is_active ? 'Yes' : 'No'
                    }
                  </td>
                  <td className="w-48">
                    {
                      admin.is_super_admin === undefined ? 'No' :
                        admin.is_super_admin ? 'Yes' : 'No'
                    }
                  </td>
                  <td className="w-48">{new Date(admin.created_at!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: "numeric" })}</td>
                  <td className="w-48">
                    {new Date(admin.updated_at!).toLocaleDateString('en-US', { month: '2-digit', day: "2-digit", year: "numeric" })} &nbsp;
                    {new Date(admin.updated_at!).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </td>
                  <td className="w-32">
                    <div className="flex items-center justify-center w-full gap-2">
                      <Link href={`/admin/admin-users/${admin.id!}`}
                        className="text-primary block cursor-pointer">
                        <Fa6SolidEye />
                      </Link>
                      {
                        admin.id! !== 1 && (<EditAdminUserButton admin={admin} />)
                      }
                    </div>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}