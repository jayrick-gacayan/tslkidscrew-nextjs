import { addCardAction } from "@/actions/stripe-actions";
import Fa6SolidCreditCard from "@/app/_components/svg/fa6-solid-credit-card";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { ToastContentProps, toast } from "react-toastify";

export default function CardDetailsStripeForm() {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) { return; }

    // Use elements.getElement to get references to the CardNumber, CardExpiry, and CardCvc elements.
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    // Use the createToken method to create a token from the card Element.
    const { token, error } = await stripe.createToken(cardNumberElement!);

    if (error) {
      console.error(error);
    } else {
      console.log('token', token);

      let result = await addCardAction(token.id!);

      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{result.message}</div>
        )
      }, {
        toastId: `add-card-details-form-${Date.now()}`,
        type: result.success ? 'success' : 'error',
        hideProgressBar: true,
      })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="space-y-4">
          <label className="space-y-1">
            <span className="font-medium">Card Number</span>
            <div className="rounded bg-secondary flex items-center gap-1">
              <div className="flex-none text-warning p-3">
                <Fa6SolidCreditCard />
              </div>
              <div className="flex-1">
                <CardNumberElement className="py-3"
                  options={{ showIcon: true, }} />
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

        </div>

      </div>
      <div className="w-fit ml-auto block space-x-4">
        <button type="submit"
          className="p-2 text-white border border-primary rounded bg-primary">
          Add Card
        </button>
      </div>
    </form>)
}