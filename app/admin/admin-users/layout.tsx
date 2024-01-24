import { ReactNode } from "react";
import ModalAdminUsersForm from "./_sections/modal-admin-users-form";

export default function Layout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <ModalAdminUsersForm />
    </>
  )
}