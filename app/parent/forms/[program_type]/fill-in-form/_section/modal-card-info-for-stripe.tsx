import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import StripeCardForm from "./stripe-card-form";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { modalStripeToggled } from "../_redux/fill-in-form-slice";
import { useAppSelector } from "@/hooks/redux-hooks";
import { FillInFormState } from "../_redux/fill-in-form-state";
import StripeElements from "@/app/parent/_components/stripe-elements";

export default function ModalCardInfoForStripe({
  program_type
}: {
  program_type: string;
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  })

  return (
    <Transition appear show={fillInFormState.stripeModalOpen} as={Fragment}>
      <Dialog as="div"
        className='fixed h-screen w-screen top-0 left-0 z-[500] flex items-center justify-center'
        onClose={() => { reduxStore.dispatch(modalStripeToggled(false)); }}>
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
            <StripeElements>
              <StripeCardForm program_type={program_type} />
            </StripeElements>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}