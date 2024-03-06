import { Tab } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/types/helpers/get-stripe";
import CardDetailsStripeForm from "./card-details-stripe-form";
import { Parent } from "@/models/parent";
import InvoiceInfoData from "../../invoices/_components/invoice-info-data";

const stripePromise = getStripe();

export default function CardDetails({
  cardDetails
}: {
  cardDetails: Partial<Parent> | undefined;
}) {

  console.log('card details', cardDetails)
  return (
    <Tab.Panel as='div' className="space-y-8">
      {
        !!cardDetails?.card_brand && !!cardDetails.card_last_four ?
          (
            <div className='block'>
              <InvoiceInfoData labelText='Card Number' data={`************${cardDetails.card_last_four}`} />
              <InvoiceInfoData labelText='Card Type' data={cardDetails.card_brand ?? ''} />
            </div>

          ) :
          (
            <Elements stripe={stripePromise} options={{}}>
              <CardDetailsStripeForm />
            </Elements>
          )
      }

    </Tab.Panel>
  )
}
