'use client';

import { Admin } from "@/models/admin";
import { useAdminUserHook } from "../../_contexts/use-admin-user-hook";

export default function EditInfoButton({ admin }: { admin: Admin }) {
  const { modalOpen, modalType, setDumpData } = useAdminUserHook();

  return (
    <button className="w-fit px-4 py-2 rounded-sm block ml-auto bg-primary text-white"
      onClick={() => {
        modalOpen(true);
        modalType('update');
        setDumpData(admin);
      }}>
      Edit Info
    </button>
  );
}