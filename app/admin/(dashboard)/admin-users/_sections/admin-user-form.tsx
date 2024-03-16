import { updateAdminUserAction, addAdminUserAction } from "@/actions/admin-actions";
import { pathRevalidate } from "@/actions/common-actions";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import InputCustom from "@/app/_components/input-custom";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { AdminUserFormStateProps } from "@/types/props/admin-user-form-state-props";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useMemo } from "react";
import { useFormState } from "react-dom";
import { ToastContentProps, toast } from "react-toastify";
import { AdminUsersState } from "../_redux/admin-users-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import {
  adminInputCheckboxFieldChanged,
  adminInputFieldChanged
} from "../_redux/admin-users-slice";
import AdminUserFormButtonSubmit from "./admin-user-form-button-submit";



export default function AdminUserForm({
  type,
  formReset
}: {
  type: string;
  formReset: () => void;
}) {
  const adminsUserState: AdminUsersState = useAppSelector((state: RootState) => {
    return state.adminUsers;
  });

  const data = useMemo(() => {
    let { email, name, isActive, isSuperAdmin } = adminsUserState.adminUserForm
    return {
      email: email,
      name: name,
      active: isActive,
      is_super_admin: isSuperAdmin
    }
  }, [
    adminsUserState.adminUserForm
  ]);

  const pathname = usePathname();

  const [state, formAction] = useFormState(
    type === 'update' ? updateAdminUserAction.bind(null, data.email.value) : addAdminUserAction,
    {
      'admin-user-email': fieldInputValue(data.email.value),
      'admin-user-name': fieldInputValue(data.name.value)
    } as Partial<AdminUserFormStateProps>
  )

  useEffect(() => {
    async function pathToRevalidate(pathName: string) {
      await pathRevalidate(pathName);
    }
    let { message, success } = state;

    if (state?.success !== undefined && state?.message !== undefined) {
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `modal-admin-user-form-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })

      if (success) {
        pathToRevalidate(pathname);
        formReset();
      }
    }
    else {
      if (state?.['admin-user-email'] && state?.['admin-user-email']?.errorText !== '') {
        reduxStore.dispatch(adminInputFieldChanged({
          key: 'email',
          data: state?.['admin-user-email']
        }))
      }

      if (state?.['admin-user-name'] && state?.['admin-user-name']?.errorText !== '') {
        reduxStore.dispatch(adminInputFieldChanged({
          key: 'name',
          data: state?.['admin-user-name']
        }))
      }
    }

  }, [
    state,
    formReset,
    pathname
  ]);

  function handleInputTextChanged(key: 'email' | 'name') {
    return function (event: ChangeEvent<HTMLInputElement>) {
      reduxStore.dispatch(adminInputFieldChanged({
        key: key,
        data: fieldInputValue(event.target.value)
      }))
    }
  }

  function handleInputCheckboxChanged(key: 'isActive' | 'isSuperAdmin') {
    return function (event: ChangeEvent<HTMLInputElement>) {
      reduxStore.dispatch(adminInputCheckboxFieldChanged({
        key: key,
        data: !event.target.checked
      }))
    }
  }

  return (
    <form action={formAction}
      className="space-y-8">
      <div className="space-y-4">
        <InputCustom labelText="Email"
          id="admin-user-email"
          name="admin-user-email"
          type="text"
          placeholder='Email Address:'
          value={data.email.value}
          className="bg-secondary border-0"
          errorText={data.email.errorText}
          validationStatus={data.email.validationStatus}
          disabled={type === 'update'}
          onChange={handleInputTextChanged("email")} />
        <InputCustom labelText="Name"
          id="admin-user-name"
          name='admin-user-name'
          type="text"
          placeholder="Name: "
          value={data.name.value}
          className="bg-secondary border-0"
          errorText={data.name.errorText}
          validationStatus={data.name.validationStatus}
          onChange={handleInputTextChanged("name")} />
      </div>
      {
        type === 'update' &&
        (
          <InputCheckboxCustom labelText="Active"
            id={`${type}-is-active`}
            name="admin-user-active"
            checked={data.active}
            onChange={handleInputCheckboxChanged("isActive")} />
        )
      }
      <InputCheckboxCustom labelText="Super Admin"
        id={`${type}-is-super-admin`}
        name="admin-user-is-super-admin"
        checked={data.is_super_admin}
        onChange={handleInputCheckboxChanged("isSuperAdmin")} />
      <AdminUserFormButtonSubmit formReset={formReset} />
    </form>
  )
}