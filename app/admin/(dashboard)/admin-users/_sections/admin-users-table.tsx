'use client';

import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { reduxStore } from "@/react-redux/redux-store";
import { editAdminUserFields, modalFormOpened } from "../_redux/admin-users-slice";

export default function AdminUsersTable() {

  return (
    <div className="block overflow-auto rounded bg-secondary h-96">
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
          <tr className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
            <td className="w-56">qwerty@gmail.com</td>
            <td className="w-auto">Rotterdam Day Care Tour</td>
            <td className="w-12">yes</td>
            <td className="w-48">false</td>
            <td className="w-48">{new Date('02/28/18 01:00 AM').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
            <td className="w-48">
              {new Date('02/28/18 01:00 AM').toLocaleDateString('en-US', { month: '2-digit', day: "2-digit", year: "numeric" })} &nbsp;
              {new Date('02/28/18 01:00 AM').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </td>
            <td className="w-32">
              <div className="flex items-center justify-center w-full gap-2">
                <Link href='/admin/admin-users/1'
                  className="text-primary block cursor-pointer">
                  <Icon icon='fa6-solid:eye' />
                </Link>
                <button className="text-warning block cursor-pointer"
                  onClick={() => {
                    reduxStore.dispatch(editAdminUserFields({
                      email: 'jayrick.gacayan@kodakollectiv.com',
                      name: 'Jayrick Gacayan',
                      isActive: true,
                      isSuperAdmin: false,
                      id: 1
                    }))
                    reduxStore.dispatch(modalFormOpened({ open: true, type: 'update' }));
                  }}>
                  <Icon icon='fa6-solid:pen' />
                </button>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}