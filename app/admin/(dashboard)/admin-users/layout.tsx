import { ReactNode } from "react";
import ModalAdminUsersForm from "./_sections/modal-admin-users-form";
import { revalidateUsers } from "./_actions/admin-user-actions";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { Admin } from "@/models/admin";

export default async function Layout({
  children
}: {
  children: ReactNode;
}) {
  let admin: Session<Admin> | null = await auth();
  return (
    <>
      {children}
      <ModalAdminUsersForm admin={admin} />
    </>
  )
}