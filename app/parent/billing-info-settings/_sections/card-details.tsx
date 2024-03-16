import { Tab } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/types/helpers/get-stripe";
import CardDetailsStripeForm from "./card-details-stripe-form";
import { Parent } from "@/models/parent";
import InvoiceInfoData from "../../invoices/_components/invoice-info-data";
import Fa6SolidLink from "@/app/_components/svg/fa6-solid-link";
import Fa6BrandVisa from "@/app/_components/svg/fa6-brand-visa";

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
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="border rounded-lg border-secondary-light p-2">
                    <InvoiceInfoData labelText='Card Number'
                      data={
                        <span className="tracking-wider">
                          {Array.from({ length: 12 }).map((_val, idx) => {
                            return (
                              <span key={`asterisk-billing-info-${idx}`} className="align-middle text-[20px]">
                                &#42;
                              </span>
                            )
                          })}
                          <span>{cardDetails.card_last_four}</span>
                        </span>
                      } />
                    <InvoiceInfoData labelText='Card Type'
                      data={
                        cardDetails?.card_brand === 'Visa' ?
                          (<Fa6BrandVisa className='align-middle inline-block text-primary text-[32px]' />) :
                          cardDetails.card_brand
                      } />
                  </div>
                </div>
                <div className="flex-none">
                  <Fa6SolidLink className="text-secondary-light inline-block text-[48px] hover:text-tertiary cursor-pointer" />
                </div>
              </div>
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
