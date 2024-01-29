import PaymentFormSummerCamp from "./payment-form-summer-camp";
import PaymentFormBeforeOrAfterSchool from "./payment-form-before-or-after-school";

export default function PaymentFormContainer({
  program_type
}: {
  program_type: string;
}) {

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Payment</h1>
      </div>
      {
        (() => {
          switch (program_type) {
            case 'summer-camp': return <PaymentFormSummerCamp />;
            case 'before-or-after-school': return <PaymentFormBeforeOrAfterSchool />;
            case 'vacation-camp': return null;
          }
          return null
        })()
      }
    </div>
  )
}