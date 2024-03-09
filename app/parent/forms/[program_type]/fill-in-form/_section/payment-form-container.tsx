import PaymentFormSummerCamp from "./payment-form-summer-camp";
import PaymentFormBeforeOrAfterSchool from "./payment-form-before-or-after-school";
import PaymentFormVacationCamp from "./payment-form-vacation-camp";
import StripeFormContainer from "./credit-card-info-container";
import { PhShoppingCartBold } from "@/app/_components/svg/ph-shopping-cart-bold";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/react-redux/redux-store";
import { useMemo } from "react";
import ModalCardInfoForStripe from "./modal-card-info-for-stripe";

export default function PaymentFormContainer({
  program_type,
}: {
  program_type: string;
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const errorText = useMemo(() => {
    return fillInFormState.fillInForm.TOSCondition.errorText;
  }, [fillInFormState.fillInForm.TOSCondition.errorText])

  return (
    <div className="relative">
      <div className="space-y-8">
        <div className="space-y-2 text-black">
          <h1 className="font-medium text-[36px]">Payment</h1>
          <p className="italic font-medium text-[18px]">The TOS is your binding CONTRACT with TSL. Please take time to read it before proceeding.</p>
          {
            errorText !== '' &&
            <div className="rounded bg-danger-light text-white p-2 text-[24px]">{errorText} </div>
          }
        </div>

        {
          (() => {
            switch (program_type) {
              case 'summer-camp': return <PaymentFormSummerCamp />;
              case 'before-or-after-school': return <PaymentFormBeforeOrAfterSchool />;
              case 'vacation-camp': return <PaymentFormVacationCamp />;
            }
            return null
          })()
        }
        <div className="rounded border shadow-lg overflow-hidden flex items-center lg:flex-row flex-col gap-4 w-full">
          <div className="flex-none w-full lg:w-[192px] text-primary lg:p-0 p-4 border-b lg:border-b-0">
            <PhShoppingCartBold height={72} width={192} className="m-auto block" />
          </div>
          <div className="flex-1 w-full divide-y divide-y-secondary-light">
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Deposit Fee:</div>
              <div>{
                Intl.NumberFormat('en-US', {
                  style: "currency",
                  currency: 'USD',
                }).format(100.00)
              }</div>
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Registration Fee:</div>
              <div>{
                Intl.NumberFormat('en-US', {
                  style: "currency",
                  currency: 'USD',
                }).format(25.00)
              }</div>
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Annual Package Fee:</div>
              <div>{
                Intl.NumberFormat('en-US', {
                  style: "currency",
                  currency: 'USD',
                }).format(0.00)
              }</div>
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
              <div>Total Amount Due:</div>
              <div>{
                Intl.NumberFormat('en-US', {
                  style: "currency",
                  currency: 'USD',
                }).format(125.00)
              }</div>
            </div>
          </div>
        </div>
        <StripeFormContainer />
      </div>
      <ModalCardInfoForStripe />
    </div>

  )
}