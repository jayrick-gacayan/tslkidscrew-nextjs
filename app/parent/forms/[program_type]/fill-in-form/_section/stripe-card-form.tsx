import Fa6SolidCreditCard from "@/app/_components/svg/fa6-solid-credit-card";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { StripeError } from "@stripe/stripe-js";
import { reduxStore } from "@/react-redux/redux-store";
import { modalStripeToggled } from "../_redux/fill-in-form-slice";

export default function StripeCardForm() {
  const [error, setError] = useState<StripeError | undefined>(undefined);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) { return; }

    // Use elements.getElement to get references to the CardNumber
    const cardNumberElement = elements.getElement(CardNumberElement);

    // Use the createPaymentMethod method to create a payment method from the card elements.
    const { token, error } = await stripe.createToken(cardNumberElement!);

    if (error) {
      setError(error);
      console.error(error);
    } else {


      console.log(token)
      // Send the payment method ID to your server to complete the payment.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="space-y-1">
          <span className="font-medium">Card Number</span>
          <div className="rounded bg-secondary flex items-center gap-1">
            <div className="flex-none text-warning p-3">
              <Fa6SolidCreditCard />
            </div>
            <div className="flex-1">
              <CardNumberElement className="py-3" options={{ showIcon: true, }} />
            </div>
          </div>
          {
            (error && (error?.code === 'incomplete_number' || error?.code === 'invalid_number')) &&
            <div className="text-danger">{error.message}</div>
          }
        </label>

        <div className="flex items-center gap-4">
          <label className="w-full space-y-1">
            <span className="font-medium">Date Expiry</span>
            <div className="rounded bg-secondary flex items-center gap-1">
              <div className="flex-none text-warning p-3">
                <Fa6SolidCreditCard />
              </div>
              <div className="flex-1">
                <CardExpiryElement className="py-3" />
              </div>
            </div>
          </label>
          <label className="w-full space-y-1">
            <span className="font-medium">CVC</span>
            <div className="rounded bg-secondary flex items-center gap-1">
              <div className="flex-none text-warning p-3">
                <Fa6SolidCreditCard />
              </div>
              <div className="flex-1">
                <CardCvcElement className="py-3" />
              </div>
            </div>
          </label>
        </div>
        {
          (error && error?.code === 'incomplete_expiry') &&
          <div className="text-danger">{error.message}</div>
        }
        {
          (error && error?.code === 'incomplete_cvc') &&
          <div className="text-danger">{error.message}</div>
        }
      </div>
      <div className="flex items-center justify-end gap-4">
        <button type='button'
          className='bg-white text-primary p-2'
          onClick={() => { reduxStore.dispatch(modalStripeToggled(false)) }}>Cancel</button>
        <button className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'>
          Submit And Pay
        </button>
      </div>
    </form>
  )
}