'use client';

import CustomInput from "@/app/_components/custom-input";
import { ValidationType } from "@/types/enums/validation-type";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { AdminUsersState } from "../_redux/admin-users-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { Transition, Dialog } from "@headlessui/react";
import { modalFormOpened } from "../_redux/admin-users-slice";

export default function ModalAdminUsersForm() {
  const adminUsersState: AdminUsersState = useAppSelector((state: RootState) => { return state.adminUsers; });

  const { type, open } = useMemo(() => { return { ...adminUsersState.modalForm } }, [adminUsersState.modalForm])

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className='fixed h-screen w-screen top-0 left-0 z-[500] flex items-center justify-center'
        onClose={() => { reduxStore.dispatch(modalFormOpened({ open: false, type: '' })) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 z-0" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel as="div" className='bg-white relative z-[50] space-y-8 p-8 w-[448px] rounded drop-shadow'>
            <Dialog.Title as="h1" className='font-medium text-[24px]'>Register Admin Account</Dialog.Title>
            <div className="space-y-4">
              <CustomInput labelText='Email'
                fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
                type='email'
                onChange={(value: string) => { return; }} />
              <CustomInput labelText='Name'
                fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
                type='text'
                onChange={(value: string) => { return; }} />
            </div>
            <div className="block form-control">
              <label className="flex items-center gap-2">
                <input type="checkbox"
                  className="border-[.1rem] border-secondary-light h-5 w-5 inline-block checkbox checked:border-primary [--chkbg:theme(colors.white)] [--chkfg:theme(colors.primary)] rounded" />
                <span className="block">Super Admin</span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-4">

              <button className='bg-white text-primary p-2'
                onClick={() => {
                  reduxStore.dispatch(modalFormOpened({ open: false, type: '' }));
                }}>Cancel</button>
              <button className='bg-primary text-white rounded p-2'
                onClick={() => {

                }}>Register</button>

            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
  // return (
  //   <dialog id="modal-admin-form" className="modal modal-bottom sm:modal-middle">
  //     <div className="modal-box bg-white space-y-8 text-black">
  //       <h3 className="font-medium text-[24px]">Register Admin Account</h3>
  //       <div className="space-y-4">
  //         <CustomInput labelText='Email'
  //           fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
  //           type='email'
  //           onChange={(value: string) => { return; }} />
  //         <CustomInput labelText='Name'
  //           fieldInput={{ value: '', errorText: '', validationStatus: ValidationType.NONE }}
  //           type='text'
  //           onChange={(value: string) => { return; }} />
  //       </div>
  //       <div className="block form-control">
  //         <label className="flex items-center gap-2">
  //           <input type="checkbox"
  //             className="border-[.1rem] border-secondary-light h-5 w-5 inline-block checkbox checked:border-primary [--chkbg:theme(colors.white)] [--chkfg:theme(colors.primary)] rounded" />
  //           <span className="block">Super Admin</span>
  //         </label>
  //       </div>
  //       <div className="flex items-center justify-end gap-4">

  //         <button className='bg-white text-primary p-2'
  //           onClick={() => {
  //             let modal: any = document.getElementById('modal-admin-form');
  //             modal?.close();
  //           }}>Cancel</button>
  //         <button className='bg-primary text-white rounded p-2'
  //           onClick={() => {
  //             let modal: any = document.getElementById('modal-admin-form');
  //             modal?.close();
  //           }}>Register</button>

  //       </div>
  //     </div>
  //     <form method='dialog' className="modal-backdrop backdrop-blur-sm">
  //       <button>close</button>
  //     </form>
  //   </dialog>
  // )
}