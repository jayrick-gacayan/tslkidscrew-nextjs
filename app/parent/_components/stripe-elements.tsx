import getStripe from '@/types/helpers/get-stripe';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';

export default function StripeElements({ children }: { children: ReactNode }) {

  return (<Elements stripe={getStripe()} options={{}}>{children}</Elements>);
}