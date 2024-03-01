'use client'

import { Transition, Dialog } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fragment, useContext } from "react";
import StripeCardForm from "./stripe-card-form";
import { FillInFormContext } from "../_context/fill-in-form-context";
import { useFillInFormHook } from "../_context/use-fill-in-form-hook";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

export default function ModalCardInfoForStripe() {
  const { state, stripeModalToggle } = useFillInFormHook();

  return (
    <Transition appear show={state.stripeModalOpen} as={Fragment}>
      <Dialog as="div"
        className='fixed h-screen w-screen top-0 left-0 z-[500] flex items-center justify-center'
        onClose={() => {
          stripeModalToggle();
        }}>
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
              Payment
            </Dialog.Title>
            <Elements stripe={stripePromise}>

              <StripeCardForm />
            </Elements>

          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}