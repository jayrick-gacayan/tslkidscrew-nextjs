'use client';

import Fa6SolidTrashCan from "@/app/_components/svg/fa6-solid-trash-can";
import { inactiveAdminUser } from "../_actions/admin-user-actions";

export default function AdminUserInactiveButton({
  id,
}: {
  id: number;
}) {
  return (
    <button onClick={async () => { inactiveAdminUser(id) }} className="text-danger cursor-pointer">
      <Fa6SolidTrashCan className="inline-block" />
    </button>
  )
}