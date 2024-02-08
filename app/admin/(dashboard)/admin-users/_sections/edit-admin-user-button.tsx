'use client';

import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import { reduxStore } from "@/react-redux/redux-store";
import { editAdminUserFields, modalFormOpened } from "../_redux/admin-users-slice";
import { Admin } from "@/models/admin";

export default function EditAdminUserButton({
  admin
}: {
  admin: Admin
}) {
  return (
    <button className="text-warning block cursor-pointer"
      onClick={() => {
        reduxStore.dispatch(editAdminUserFields({
          email: admin.email!,
          name: admin.name!,
          isActive: admin.is_active!,
          isSuperAdmin: admin.is_super_admin!,
          id: admin.id!
        }))
        reduxStore.dispatch(modalFormOpened({ open: true, type: 'update' }));
      }}>
      <Fa6SolidPen />
    </button>
  )
}