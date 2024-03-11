import { updateAdminUserAction, addAdminUserAction } from "@/actions/admin-actions";
import { pathRevalidate } from "@/actions/common-actions";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import InputCustom from "@/app/_components/input-custom";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { AdminUserFormStateProps } from "@/types/props/admin-user-form-state-props";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ToastContentProps, toast } from "react-toastify";
import { AdminUsersState } from "../_redux/admin-users-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { adminInputFieldChanged } from "../_redux/admin-users-slice";

function AdminUserFormSubmit({ formReset }: { formReset: () => void; }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center justify-end gap-4">
      <button type='button'
        className='bg-white text-primary p-2 disabled:cursor-not-allowed'
        disabled={pending}
        onClick={() => { formReset() }}>Cancel</button>
      <button type="submit"
        className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'
        disabled={pending}>
        {pending ? <><Spinners3DotsScale className="text-white text-[24px] inline-block mr-1" /></> : 'Save'}
      </button>
    </div>
  )
}

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

  function handleInputChange(key: 'email' | 'name') {
    return function (event: ChangeEvent<HTMLInputElement>) {
      reduxStore.dispatch(adminInputFieldChanged({
        key: key,
        data: fieldInputValue(event.target.value)
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
          onChange={handleInputChange("email")} />
        <InputCustom labelText="Name"
          id="admin-user-name"
          name='admin-user-name'
          type="text"
          placeholder="Name: "
          value={data.name.value}
          className="bg-secondary border-0"
          errorText={data.name.errorText}
          validationStatus={data.name.validationStatus}
          onChange={handleInputChange("name")} />
      </div>
      {
        type === 'update' &&
        (
          <InputCheckboxCustom labelText="Active"
            id={`${type}-is-active`}
            name="admin-user-active"
            defaultChecked={data?.active ?? false} />
        )
      }
      <InputCheckboxCustom labelText="Super Admin"
        id={`${type}-is-super-admin`}
        name="admin-user-is-super-admin"
        defaultChecked={data?.is_super_admin ?? false} />
      <AdminUserFormSubmit formReset={formReset} />
    </form>
  )
}