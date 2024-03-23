import { reduxStore } from '@/react-redux/redux-store';
import { modalStripeToggled } from '../_redux/fill-in-form-slice';
import StripeFormElements from '@/app/parent/_components/stripe-form-elements';

export default function StripeCardForm({ program_type }: { program_type: string; }) {

  return (
    <StripeFormElements onSuccessStripe={async (token: string) => {
      let form = document.getElementById(`${program_type}-fill-in-form`) as HTMLFormElement;

      if (!!form) {
        let input = document.createElement('input');

        input.setAttribute('type', 'hidden');
        input.setAttribute('name', 'stripe_token');
        input.setAttribute('value', token);

        form.append(input);

        form.requestSubmit();
        reduxStore.dispatch(modalStripeToggled(false));
      }
    }} />
  );
}
