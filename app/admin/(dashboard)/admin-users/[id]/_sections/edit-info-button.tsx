'use client';

import { reduxStore } from "@/react-redux/redux-store";
import { editAdminUserFields, modalFormOpenStateSet, modalFormTypeSet } from "../../_redux/admin-users-slice";
import { Admin } from "@/models/admin";

export default function EditInfoButton({ admin }: { admin: Admin }) {

  return (
    <button className="w-fit px-4 py-2 rounded-sm block ml-auto bg-primary text-white"
      onClick={() => {
        reduxStore.dispatch(editAdminUserFields({
          email: admin.email!,
          name: admin.name!,
          isActive: admin.active!,
          isSuperAdmin: admin.is_super_admin!,
          id: admin.id!
        }))
        reduxStore.dispatch(modalFormOpenStateSet(true));
        reduxStore.dispatch(modalFormTypeSet('update'));
      }}>
      Edit Info
    </button>
  );
}