'use client';

import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import { reduxStore } from "@/react-redux/redux-store";
import { editAdminUserFields, modalFormOpened } from "../_redux/admin-users-slice";

export default function EditAdminUserButton() {
  return (
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
      <Fa6SolidPen />
    </button>
  )
}