import Fa6SolidCreditCard from '@/app/_components/svg/fa6-solid-credit-card';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import {
  Stripe,
  StripeCardNumberElement,
  StripeElements,
  StripeError
} from '@stripe/stripe-js';
import { useState, FormEvent } from 'react';

export default function StripeFormElements({
  buttonText,
  onSuccessStripe,
  onCancel,
}: {
  buttonText: string;
  onSuccessStripe: (token: string) => Promise<void>;
  onCancel?: () => void;
}) {
  const [error, setError] = useState<StripeError | undefined>(undefined);
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) { return; }

    // Use elements.getElement to get references to the CardNumber
    const cardNumberElement: StripeCardNumberElement | null = elements.getElement(CardNumberElement);

    // Use the createPaymentMethod method to create a payment method from the card elements.
    const { token, error } = await stripe.createToken(cardNumberElement!);

    if (error) { setError(error); }
    else { await onSuccessStripe(token.id); }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      <div className='space-y-4'>
        <label className='space-y-1'>
          <span className='font-medium'>Card Number</span>
          <div className='rounded bg-secondary flex items-center gap-1'>
            <div className='flex-none text-warning p-3'>
              <Fa6SolidCreditCard />
            </div>
            <div className='flex-1'>
              <CardNumberElement className='py-3' options={{ showIcon: true, }} />
            </div>
          </div>
        </label>
        <div className='flex items-center gap-4'>
          <label className='w-full space-y-1'>
            <span className='font-medium'>Date Expiry</span>
            <div className='rounded bg-secondary flex items-center gap-1'>
              <div className='flex-none text-warning p-3'>
                <Fa6SolidCreditCard />
              </div>
              <div className='flex-1'>
                <CardExpiryElement className='py-3' />
              </div>
            </div>
          </label>
          <label className='w-full space-y-1'>
            <span className='font-medium'>CVC</span>
            <div className='rounded bg-secondary flex items-center gap-1'>
              <div className='flex-none text-warning p-3'>
                <Fa6SolidCreditCard />
              </div>
              <div className='flex-1'>
                <CardCvcElement className='py-3' />
              </div>
            </div>
          </label>
        </div>
        {error && (<div className='text-danger'>{error.message}</div>)}
      </div>
      <div className='flex items-center justify-end gap-4'>
        {
          onCancel &&
          (
            <button type='button'
              className='bg-white text-primary p-2'
              onClick={onCancel}>
              Cancel
            </button>
          )
        }
        <button className='disabled:cursor-not-allowed bg-primary text-white rounded p-2'>
          {buttonText}
        </button>
      </div>
    </form>
  );
}