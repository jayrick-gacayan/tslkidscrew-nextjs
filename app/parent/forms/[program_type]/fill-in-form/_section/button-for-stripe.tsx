import { Parent } from '@/models/parent';
import PendingAction from '../_components/pending-actions';
import { Dispatch, SetStateAction } from 'react';

export default function ButtonForStripe({
  pending,
  cardDetails,
  setButtonPress,
}: {
  pending: boolean;
  cardDetails: Pick<Parent, 'card_brand' | 'card_last_four'> | undefined;
  setButtonPress: Dispatch<SetStateAction<string>>;
}) {
  return (
    <button name='submit-stripe-button'
      value='submit-stripe-button'
      type='submit'
      className={`px-4 py-2 w-full bg-primary text-white rounded disabled:cursor-not-allowed`}
      disabled={pending}
      onClick={() => { setButtonPress('stripe') }}>
      {
        pending ? (<PendingAction />) :
          <>
            {
              !!cardDetails &&
                !!cardDetails.card_brand &&
                !!cardDetails.card_last_four ? 'Proceed to Payment with Card on File' :
                'Proceed to Payment'
            }
          </>
      }
    </button>
  );
}