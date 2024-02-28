'use client';

import { Fragment, useCallback, useMemo } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useAdminUserHook } from "../_contexts/use-admin-user-hook";
import AdminUserForm from "./admin-user-form";

export default function ModalAdminUsersForm() {
  const { state, modalOpen, modalType, setDumpData } = useAdminUserHook();

  const { type, open } = useMemo(() => {
    return {
      type: state ? state?.modal?.type : '',
      open: state ? state?.modal?.open : false
    }
  }, [state]);

  const data = useMemo(() => {
    return state?.data ?? undefined
  }, [state]);

  const formReset = useCallback(() => {
    modalOpen(false);
    let timeout = setTimeout(() => {
      modalType('')
      setDumpData(undefined);

    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [modalOpen, modalType, setDumpData])

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
            <h1 className='font-medium text-[24px]'>{type === 'add' ? 'Add' : 'Edit'} Admin Account</h1>
            <AdminUserForm type={type} data={data} formReset={formReset} />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}