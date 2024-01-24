'use client';

import { reduxStore } from "@/react-redux/redux-store";
import { modalFormOpened } from "../../_redux/admin-users-slice";

export default function EditInfoButton() {

  return (
    <button className="w-fit px-4 py-2 rounded-sm block ml-auto bg-primary text-white"
      onClick={() => {
        reduxStore.dispatch(modalFormOpened({ open: true, type: 'update' }))
      }}>
      Edit Info
    </button>
  );
}