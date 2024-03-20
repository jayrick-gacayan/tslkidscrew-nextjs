import { Tab } from '@headlessui/react';
import CardDetailsStripeForm from './card-details-stripe-form';
import { Parent } from '@/models/parent';
import CardDetailsInfo from './card-details-info';
import StripeElements from '../../_components/stripe-elements';

export default function CardDetails({ cardDetails }: { cardDetails: Pick<Parent, 'card_last_four' | 'card_brand'> | undefined; }) {

  return (
    <Tab.Panel as='div' className='space-y-8'>
      {
        (!!cardDetails && !!cardDetails.card_brand && !!cardDetails.card_last_four) ? (<CardDetailsInfo cardDetails={cardDetails} />) :
          (
            <StripeElements>
              <CardDetailsStripeForm />
            </StripeElements>
          )
      }
    </Tab.Panel>
  )
}
