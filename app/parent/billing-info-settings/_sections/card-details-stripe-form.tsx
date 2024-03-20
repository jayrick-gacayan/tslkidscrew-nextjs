import { addCardAction } from '@/actions/stripe-actions';
import { ToastContentProps, toast } from 'react-toastify';
import StripeFormElements from '../../_components/stripe-form-elements';

export default function CardDetailsStripeForm() {

  return (
    <StripeFormElements onSuccessStripe={async (token: string) => {
      let result = await addCardAction(token);

      toast((props: ToastContentProps<unknown>) => {
        return (<div className='text-black'>{result.message}</div>);
      }, {
        toastId: `add-card-details-form-${Date.now()}`,
        type: result.success ? 'success' : 'error',
        hideProgressBar: true,
      });
    }} />
  );
}