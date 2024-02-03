

import { Fa6SolidCreditCard } from "@/app/_components/svg/fa6-solid-credit-card";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { StripeCardNumberElement, StripeCardNumberElementChangeEvent } from "@stripe/stripe-js/types/stripe-js/elements/card-number";
import { FormEvent, useContext } from "react";
import { FillInFormContext } from "../_context/fill-in-form-context";
import { StripeElementType } from "@stripe/stripe-js";

export default function StripeCardForm() {
  const { dispatch } = useContext(FillInFormContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }


    // Use elements.getElement to get references to the CardNumber, CardExpiry, and CardCvc elements.
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    // Use the createPaymentMethod method to create a payment method from the card elements.
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement!,

    });

    if (error) {
      console.error(error);
    } else {
      console.log(paymentMethod);
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
              <CardNumberElement className="py-3"
                options={{ showIcon: true, }}
                onReady={(element: StripeCardNumberElement) => {
                  console.log("CardNumberElement [ready]", element);
                }}

                onBlur={(event: {
                  elementType: StripeElementType;
                }) => {
                  console.log("CardNumberElement [blur]", event.elementType);
                }}
                onFocus={(event: {
                  elementType: StripeElementType;
                }) => {
                  console.log("CardNumberElement [focus]", event.elementType);
                }}
                onChange={(event: StripeCardNumberElementChangeEvent) => {
                  console.log("CardNumberElement [change]", event.error);
                }} />
            </div>
          </div>
        </label>

        <div className="flex items-center gap-4">
          <label className="w-full space-y-1">
            <span className="font-medium">Date Expiry</span>
            <div className="rounded bg-secondary flex items-center gap-1">
              <div className="flex-none text-warning p-3">
                <Fa6SolidCreditCard />
              </div>
              <div className="flex-1">
                <CardExpiryElement className="py-3"

                  onChange={event => {
                    console.log("CardNumberElement [change]", event);
                  }} />
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
                <CardCvcElement className="py-3"
                  onChange={event => {
                    console.log("CardNumberElement [change]", event);
                  }} />
              </div>
            </div>
          </label>
        </div>

      </div>
      <div className="flex items-center justify-end gap-4">
        <button type='button'
          className='bg-white text-primary p-2'
          onClick={() => { dispatch({ type: 'MODAL_TOGGLE' }); }}>Cancel</button>
        <button className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'>
          Submit And Pay
        </button>
      </div>
    </form>
  )
}