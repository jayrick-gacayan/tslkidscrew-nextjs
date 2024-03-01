import { updateAdminUserAction, addAdminUserAction } from "@/actions/admin-actions";
import { pathRevalidate } from "@/actions/common-actions";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import InputCustom from "@/app/_components/input-custom";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { AdminUserFormStateProps } from "@/types/props/admin-user-form-state-props";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { ToastContentProps, toast } from "react-toastify";

function ButtonSubmit({ formReset }: { formReset: () => void; }) {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center justify-end gap-4">
      <button type='button'
        className='bg-white text-primary p-2 disabled:cursor-not-allowed'
        disabled={pending}
        onClick={() => {
          formReset()
        }}>Cancel</button>
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
  data,
  formReset
}: {
  type: string;
  data: any;
  formReset: () => void;
}) {
  const pathname = usePathname();
  const [state, formAction] = useFormState(
    type === 'update' ? updateAdminUserAction.bind(null, data?.email ?? '') : addAdminUserAction,
    {
      'admin-user-email': fieldInputValue(type === 'update' ? data?.email : ''),
      'admin-user-name': fieldInputValue(type === 'update' ? data?.name : '')
    } as AdminUserFormStateProps
  )

  useEffect(() => {
    async function pathToRevalidate(pathName: string) {
      await pathRevalidate(pathName);
    }
    let { message, success } = state;
    if (success !== undefined) {
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `${type}-admin-user-form-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })

      if (success) {
        pathToRevalidate(pathname);
        formReset();
      }
    }

  }, [
    formReset,
    pathname,
    state
  ]);

  console.log('pathname', pathname)

  return (
    <form action={formAction}
      className="space-y-8">
      <div className="space-y-4">
        <InputCustom labelText="Email"
          id="admin-user-email"
          name="admin-user-email"
          type="text"
          placeholder='Email Address:'
          defaultValue={data?.email ?? ''}
          className="bg-secondary border-0"
          errorText={state?.["admin-user-email"]?.errorText}
          validationStatus={state?.["admin-user-email"]?.validationStatus}
          disabled={type === 'update'} />
        <InputCustom labelText="Name"
          id="admin-user-name"
          name='admin-user-name'
          type="text"
          placeholder="Name: "
          defaultValue={data?.name ?? ''}
          className="bg-secondary border-0"
          errorText={state?.["admin-user-name"]?.errorText}
          validationStatus={state?.["admin-user-name"]?.validationStatus} />
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
      <ButtonSubmit formReset={formReset} />
    </form>
  )
}