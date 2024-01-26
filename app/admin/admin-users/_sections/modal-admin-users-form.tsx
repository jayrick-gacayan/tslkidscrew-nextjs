'use client';

import CustomInput from "@/app/_components/custom-input";
import { Fragment, useContext, useMemo } from "react";
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
import { SampleContext } from "./form-actions-providers";

export default function ModalAdminUsersForm() {
  const { formAction, state } = useContext(SampleContext);
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
    isSuperAdmin
  } = useMemo(() => {
    return { ...adminUsersState.adminUserForm };
  }, [adminUsersState.adminUserForm]);

  function formReset() {
    formAction();
    reduxStore.dispatch(adminUserFormReset());
    reduxStore.dispatch(modalFormOpened({ open: false, type: '' }));
  }

  console.log('state', state.count)

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
            <div className="space-y-4">
              <CustomInput labelText='Email'
                fieldInput={email}
                onChange={(value: string) => { reduxStore.dispatch(adminUserEmailChanged(value)); }}
                type='email' />
              <CustomInput labelText='Name'
                fieldInput={name}
                onChange={(value: string) => { reduxStore.dispatch(adminUserNameChanged(value)); }}
                type='text' />
            </div>
            {
              type === 'update' &&
              (
                <CustomCheckbox value={isActive}
                  onChange={(value: boolean) => { reduxStore.dispatch(adminUserIsActiveChanged(value)); }}
                  text='Active' />
              )
            }
            <CustomCheckbox value={isSuperAdmin}
              onChange={(value: boolean) => { reduxStore.dispatch(adminUserIsSuperAdminChanged(value)); }}
              text='Super Admin' />
            <div className="flex items-center justify-end gap-4">
              <button className='bg-white text-primary p-2' onClick={formReset}>Cancel</button>
              <button className='bg-primary text-white rounded p-2'
                onClick={() => {
                  if (type === 'add') { }
                  else if (type === 'update') { }
                }}>
                Save
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}