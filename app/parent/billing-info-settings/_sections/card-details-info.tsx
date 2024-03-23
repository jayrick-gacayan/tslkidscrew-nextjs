import Fa6BrandVisa from '@/app/_components/svg/fa6-brand-visa'
import Fa6SolidLink from '@/app/_components/svg/fa6-solid-link'
import { Parent } from '@/models/parent'
import ParentInfoData from '../../_components/parent-info-data'
import { unlinkStripeCardAction } from '@/actions/stripe-actions';
import { ToastContentProps, toast } from 'react-toastify';
import { pathRevalidate } from '@/actions/common-actions';

export default function CardDetailsInfo({ cardDetails }: { cardDetails: Pick<Parent, 'card_last_four' | 'card_brand'> }) {
  async function unlinkStripeCard() {

    let result = await unlinkStripeCardAction();

    let { message, success } = result;

    toast((props: ToastContentProps<unknown>) => {
      return (
        <div className="text-black">{message}</div>
      )
    }, {
      toastId: `unlink-bank-details-${Date.now()}`,
      type: success ? 'success' : 'error',
      hideProgressBar: true,
    });
    console.log("I am here", success)
    if (success) {
      await pathRevalidate('/parent/billing-info-settings');
    }
  }

  return (
    <div className='block'>
      <div className='flex items-center justify-between gap-2'>
        <div className='flex-1'>
          <div className='border rounded-lg border-secondary-light p-2'>
            <ParentInfoData labelText='Card Number'
              data={
                <span className='tracking-wider'>
                  {Array.from({ length: 12 }).map((_val, idx) => {
                    return (
                      <span key={`asterisk-billing-info-${idx}`} className='align-middle text-[20px]'>
                        &#42;
                      </span>
                    )
                  })}
                  <span>{cardDetails.card_last_four}</span>
                </span>
              } />
            <ParentInfoData labelText='Card Type'
              data={
                cardDetails?.card_brand === 'Visa' ?
                  (<Fa6BrandVisa className='align-middle inline-block text-primary text-[32px]' />) :
                  cardDetails.card_brand
              } />
          </div>
        </div>
        <div className='flex-none'>
          <button onClick={unlinkStripeCard}>
            <Fa6SolidLink className='text-secondary-light inline-block text-[48px] hover:text-tertiary cursor-pointer' />
          </button>
        </div>
      </div>
    </div>
  )
}