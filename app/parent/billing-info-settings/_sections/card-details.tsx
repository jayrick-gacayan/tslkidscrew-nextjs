'use client';
import { Tab } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/types/helpers/get-stripe";
import CardDetailsStripeForm from "./card-details-stripe-form";

const stripePromise = getStripe();

export default function CardDetails() {


  return (
    <Tab.Panel as='div' className="space-y-8">
      <Elements stripe={stripePromise} options={{}}>
        <CardDetailsStripeForm />
      </Elements>
    </Tab.Panel>
  )
}
