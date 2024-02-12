'use client';

import { reduxStore } from "@/react-redux/redux-store";
import { modalFormOpenStateSet, modalFormTypeSet } from "../../_redux/admin-users-slice";

export default function EditInfoButton() {

  return (
    <button className="w-fit px-4 py-2 rounded-sm block ml-auto bg-primary text-white"
      onClick={() => {
        reduxStore.dispatch(modalFormOpenStateSet(true));
        reduxStore.dispatch(modalFormTypeSet('update'));
      }}>
      Edit Info
    </button>
  );
}