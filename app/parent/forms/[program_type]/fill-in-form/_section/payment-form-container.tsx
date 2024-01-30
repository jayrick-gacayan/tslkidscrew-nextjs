import PaymentFormSummerCamp from "./payment-form-summer-camp";
import PaymentFormBeforeOrAfterSchool from "./payment-form-before-or-after-school";
import PaymentFormVacationCamp from "./payment-form-vacation-camp";
import StripeFormContainer from "./stripe-form-container";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function PaymentFormContainer({
  program_type
}: {
  program_type: string;
}) {

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Payment</h1>
        <p className="italic font-medium text-[18px]">The TOS is your binding CONTRACT with TSL. Please take time to read it before proceeding.</p>
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
      <div className="rounded border shadow-lg overflow-hidden flex items-center gap-4 w-full">
        <div className="flex-none w-[192px] text-primary">
          <Icon icon="ph:shopping-cart-bold" height={72} width={192} />
        </div>
        <div className="flex-1 divide-y divide-y-secondary-light">
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
  )
}