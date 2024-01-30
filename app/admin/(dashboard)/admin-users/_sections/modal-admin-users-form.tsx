'use client';

import CustomInput from "@/app/_components/custom-input";
import { Fragment, useContext, useMemo, useRef } from "react";
import { AdminUsersState } from "../_redux/admin-users-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { Transition, Dialog } from "@headlessui/react";
import {
  adminUserEmailChanged,
  adminUserFormReset,
  adminUserIsActiveChanged,
  adminUserIsSuperAdminChanged,
  adminUserNameChanged,
  modalFormOpened
} from "../_redux/admin-users-slice";
import CustomCheckbox from "@/app/_components/custom-checkbox";
import { useFormState, useFormStatus } from "react-dom";
import { addAdminUser, updateAdminUser } from "../_actions/admin-user-actions";

export default function ModalAdminUsersForm() {
  const modalFormRef = useRef<HTMLFormElement>(null);
  const adminUsersState: AdminUsersState = useAppSelector((state: RootState) => { return state.adminUsers; });

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
    id
  } = useMemo(() => {
    return { ...adminUsersState.adminUserForm };
  }, [adminUsersState.adminUserForm]);

  const [state, formAction] = useFormState((state: any, formData: any) => {
    return type === 'update' ? updateAdminUser(id!, formData) : addAdminUser(state, formData);
  }, {} as any);
  const { pending, data, action, method } = useFormStatus();


  function formReset() {
    reduxStore.dispatch(adminUserFormReset());
    reduxStore.dispatch(modalFormOpened({ open: false, type: '' }))
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className='fixed h-screen w-screen top-0 left-0 z-[500] flex items-center justify-center'
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
            <Dialog.Title as="h1" className='font-medium text-[24px]'>
              {type === 'add' ? 'Register' : 'Edit'} Admin Account
            </Dialog.Title>
            <form action={formAction} ref={modalFormRef} className="space-y-8">
              <div className="space-y-4">
                <CustomInput labelText='Email'
                  name="email"
                  fieldInput={email}
                  type='text' />
                <CustomInput labelText='Name'
                  name="name"
                  fieldInput={name}
                  type='text' />
              </div>
              {
                type === 'update' &&
                (
                  <CustomCheckbox value={isActive}
                    name="isActive"
                    text='Active' />
                )
              }
              <CustomCheckbox value={isSuperAdmin}
                name="isAdmin"
                text='Super Admin' />
              <div className="flex items-center justify-end gap-4">
                <button type='button'
                  className='bg-white text-primary p-2'
                  onClick={formReset}>Cancel</button>
                <button className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'
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