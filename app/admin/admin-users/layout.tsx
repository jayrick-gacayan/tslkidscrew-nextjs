import { ReactNode } from "react";
import ModalAdminUsersForm from "./_sections/modal-admin-users-form";
import FormActionsProviders from "./_sections/form-actions-providers";

export default function Layout({
  children
}: {
  children: ReactNode;
}) {

  async function sampleFormAction(prevState: any, formData: any) {
    'use server';

    return { count: prevState.count + 1 }
  }
  return (
    <>
      <FormActionsProviders sampleFormAction={sampleFormAction}>
        {children}
        <ModalAdminUsersForm />
      </FormActionsProviders>
    </>
  )
}