'use client';

import { Admin } from "@/models/admin";
import { reduxStore } from "@/react-redux/redux-store";
import { editAdminUserFields, modalFormOpened, modalFormTypeSet } from "../../_redux/admin-users-slice";

export default function EditInfoButton({ admin }: { admin: Admin }) {

  return (
    <button className="w-fit px-4 py-2 rounded-sm block ml-auto bg-primary text-white"
      onClick={() => {
        let { email, name, id, is_super_admin, active } = admin
        reduxStore.dispatch(modalFormOpened(true));
        reduxStore.dispatch(modalFormTypeSet('update'));
        reduxStore.dispatch(editAdminUserFields({ email, name, id, is_super_admin, active }))
      }}>
      Edit Info
    </button>
  );
}