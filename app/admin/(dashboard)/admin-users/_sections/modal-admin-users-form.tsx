'use client';

import CustomInput from "@/app/_components/custom-input";
import { FormEvent, Fragment, useContext, useEffect, useMemo, useRef } from "react";
import { AdminUsersState } from "../_redux/admin-users-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { Transition, Dialog } from "@headlessui/react";
import {
  adminUserEmailChanged,
  adminUserFormReset,
  adminUserFormSubmitted,
  adminUserNameChanged,
  adminUserRequestStatusSet,
  modalFormOpened
} from "../_redux/admin-users-slice";
import CustomCheckbox from "@/app/_components/custom-checkbox";
import { useFormState, useFormStatus } from "react-dom";

import { fieldInputValue } from "@/types/helpers/field-input-value";
import { RequestStatus } from "@/types/enums/request-status";

export default function ModalAdminUsersForm() {
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

  const { pending, data, action, method } = useFormStatus();

  useEffect(() => {
    switch (requestStatus) {
      case RequestStatus.IN_PROGRESS:
        if (type === 'add') {

        }
        break;
    }
  }, [requestStatus, type])

  function formReset() {
    reduxStore.dispatch(adminUserFormReset());
    reduxStore.dispatch(modalFormOpened({ open: false, type: '' }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    reduxStore.dispatch(adminUserRequestStatusSet(RequestStatus.WAITING));
    reduxStore.dispatch(adminUserFormSubmitted())
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
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="space-y-4">
                <CustomInput labelText='Email'
                  name="email"
                  fieldInput={email}
                  onChange={(value: string) => {
                    reduxStore.dispatch(adminUserEmailChanged(value));
                  }}
                  type='text' />
                <CustomInput labelText='Name'
                  name="name"
                  fieldInput={name}
                  type='text'
                  onChange={(value: string) => {
                    reduxStore.dispatch(adminUserNameChanged(value));
                  }} />
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