import { Products } from 'plaid';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  PlaidLinkError,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  usePlaidLink
} from 'react-plaid-link';
import PendingAction from '../_components/pending-actions';

export default function ButtonForPlaid({
  program_type,
  hasBankDetails,
  pending,
  setButtonPress,
  buttonPress,
  bankName,
}: {
  program_type: string;
  hasBankDetails?: boolean | undefined;
  pending: boolean;
  setButtonPress: Dispatch<SetStateAction<string>>;
  buttonPress: string;
  bankName: string;
}) {
  const [linkToken, setLinkToken] = useState<string>('');

  const onSuccess = useCallback<PlaidLinkOnSuccess>((
    public_token: string,
    metadata: PlaidLinkOnSuccessMetadata) => {

    // send public_token to server
    // console.log('public token', public_token)
    // console.log('metadata', metadata)

    let form = document.getElementById(`${program_type}-fill-in-form`) as HTMLFormElement;

    if (!!form) {
      let inputPublicToken = document.createElement('input');

      inputPublicToken.setAttribute('type', 'hidden');
      inputPublicToken.setAttribute('name', 'public_token');
      inputPublicToken.setAttribute('value', public_token);

      let inputAccountId = document.createElement('input');

      inputAccountId.setAttribute('type', 'hidden');
      inputAccountId.setAttribute('name', 'account_id');
      inputAccountId.setAttribute('value', metadata.accounts[0].id);

      form.append(inputPublicToken);
      form.append(inputAccountId);

      form.requestSubmit();
    }
  }, [program_type,]);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName: string, metadata: any) => {
    console.log(eventName, metadata);
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>((error: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
    setButtonPress('')
    console.log(error, metadata);
  }, [setButtonPress]);


  const { open, ready } = usePlaidLink({
    env: "sandbox",
    publicKey: process.env.NEXT_PLAID_PUBLIC_KEY!,
    clientName: 'TSL Adventures',
    product: [Products.Auth],

    token: linkToken,
    onSuccess,
    onEvent,
    onExit,
  });

  useEffect(() => {
    async function getLinkToken() {
      const result = await fetch(`/api/create_plaid_link_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      let response = await result.json();
      setLinkToken(response.link_token)
    }
    getLinkToken();
  }, []);

  useEffect(() => {
    if (buttonPress === 'plaid') {
      if (hasBankDetails !== undefined) {
        if (!hasBankDetails) {
          if (ready) {
            open();
          }
        }
      }
    }
  }, [
    hasBankDetails,
    ready,
    open,
    buttonPress
  ]);

  return (
    <button name='submit-plaid-button'
      value='submit-plaid-button'
      type='submit'
      className='px-4 py-2 block w-full bg-orange-500 hover:bg-orange-300/70 text-white rounded disabled:cursor-not-allowed'
      disabled={pending}
      onClick={() => { setButtonPress('plaid'); }}>
      {
        pending && buttonPress === 'plaid' ? (<PendingAction />) :
          <>
            {
              bankName === '' ? 'Link Bank Details and Proceed to Payment' :
                'Proceed to Payment with Bank Details on File'
            }
          </>
      }
    </button>
  )
}