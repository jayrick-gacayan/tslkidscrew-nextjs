'use client';

import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { AdminUsersState } from "../_redux/admin-users-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { Transition, Dialog } from "@headlessui/react";
import {
  adminUserEmailChanged,
  adminUserFormReset,
  adminUserFormSubmitted,
  adminUserIsActiveChanged,
  adminUserIsSuperAdminChanged,
  adminUserNameChanged,
  adminUserRequestStatusSet,
  modalFormOpenStateSet,
  modalFormTypeSet,
} from "../_redux/admin-users-slice";
import { RequestStatus } from "@/types/enums/request-status";
import InputCustom from "@/app/_components/input-custom";
import { addUserAdmin, updateUserAdmin } from "../_redux/admin-users-thunk";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { Session } from "next-auth";
import { Admin } from "@/models/admin";
import { revalidateUsers } from "../_actions/admin-user-actions";

export default function ModalAdminUsersForm({ admin }: { admin: Session<Admin> | null; }) {
  const adminUsersState: AdminUsersState = useAppSelector((state: RootState) => {
    return state.adminUsers;
  });

  const {
    type,
    open
  } = useMemo(() => {
    return { ...adminUsersState.modalForm }
  }, [adminUsersState.modalForm])

  const {
    email,
    name,
    isActive,
    isSuperAdmin,
    id,
    requestStatus
  } = useMemo(() => {
    return { ...adminUsersState.adminUserForm };
  }, [adminUsersState.adminUserForm]);

  let pending = requestStatus === RequestStatus.WAITING || requestStatus === RequestStatus.IN_PROGRESS;

  const formReset = useCallback(() => {
    reduxStore.dispatch(modalFormOpenStateSet(false));
    let timeout = setTimeout(() => {
      reduxStore.dispatch(adminUserFormReset());
      reduxStore.dispatch(modalFormTypeSet(''));
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  useEffect(() => {
    async function userRevalidate() {
      await revalidateUsers('/admin/admin-users');
    }

    switch (requestStatus) {
      case RequestStatus.IN_PROGRESS:
        if (admin?.accessToken) {
          if (type === 'add') {
            reduxStore.dispatch(addUserAdmin(admin.accessToken));
          }
          else if (type === 'update') {
            reduxStore.dispatch(updateUserAdmin(admin.accessToken));
          }
        }
        break;
      case RequestStatus.SUCCESS:
        userRevalidate();
        formReset();
        break;
    }

  }, [
    requestStatus,
    type,
    formReset,
    admin?.accessToken,
    revalidateUsers
  ])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    reduxStore.dispatch(adminUserRequestStatusSet(RequestStatus.WAITING));
    reduxStore.dispatch(adminUserFormSubmitted())
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div"
        tabIndex={0}
        className='fixed h-screen w-screen top-0 left-0 z-[9999] flex items-center justify-center'
        onClose={formReset}>
        <Transition.Child as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 z-0" />
        </Transition.Child>
        <Transition.Child as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <Dialog.Panel as="div" className='bg-white relative z-[50] space-y-8 p-8 w-[448px] rounded drop-shadow'>
            <h1 className='font-medium text-[24px]'>{type === 'add' ? 'Register' : 'Edit'} Admin Account</h1>
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="space-y-4">
                <InputCustom labelText="Email"
                  id="admin-user-email"
                  name="admin-user-email"
                  type="text"
                  placeholder='Email Address:'
                  value={email.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    reduxStore.dispatch(adminUserEmailChanged(event.target.value));
                  }}
                  className="bg-secondary border-0"
                  errorText={email.errorText}
                  validationType={email.validationStatus}
                  disabled={type === 'update'} />
                <InputCustom labelText="Name"
                  id="admin-user-name"
                  name="admin-user-name"
                  type="text"
                  placeholder="Name: "
                  value={name.value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    reduxStore.dispatch(adminUserNameChanged(event.target.value));
                  }}
                  className="bg-secondary border-0"
                  errorText={name.errorText}
                  validationType={name.validationStatus} />
              </div>
              {
                type === 'update' &&
                (
                  <InputCheckboxCustom labelText="Active"
                    id={`${type}-is-active`}
                    checked={isActive}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      reduxStore.dispatch(adminUserIsActiveChanged(isActive ? false : true))
                    }} />
                )
              }
              <InputCheckboxCustom labelText="Super Admin"
                id={`${type}-is-super-admin`}
                checked={isSuperAdmin}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  reduxStore.dispatch(adminUserIsSuperAdminChanged(isSuperAdmin ? false : true))
                }} />
              <div className="flex items-center justify-end gap-4">
                <button type='button'
                  className='bg-white text-primary p-2 disabled:cursor-not-allowed'
                  disabled={pending}
                  onClick={formReset}>Cancel</button>
                <button type="submit"
                  className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'
                  disabled={pending}>
                  {pending ? 'Processing' : 'Save'}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}