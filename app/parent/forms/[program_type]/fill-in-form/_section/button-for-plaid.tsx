import { Products } from 'plaid';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  PlaidLinkOnSuccessMetadata,
  usePlaidLink
} from 'react-plaid-link';

export default function ButtonForPlaid({
  program_type,
  hasBankDetails,
  pending,
  setButtonPress,
}: {
  program_type: string;
  hasBankDetails?: boolean | undefined;
  pending: boolean;
  setButtonPress: Dispatch<SetStateAction<string>>
}) {
  const [linkToken, setLinkToken] = useState<string>('');

  const { open, ready } = usePlaidLink({
    env: "sandbox",
    publicKey: process.env.NEXT_PLAID_PUBLIC_KEY!,
    clientName: 'TSL Adventures',
    product: [Products.Auth],
    token: linkToken,
    onSuccess: (
      public_token: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
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
    },
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
    if (hasBankDetails !== undefined) {
      if (!hasBankDetails) {
        open();
      }
    }
  }, [
    hasBankDetails,
    open,
  ]);



  return (
    <button name='submit-plaid-button'
      value='submit-plaid-button'
      type='submit'
      className='px-4 py-2 w-44 bg-orange-500 hover:bg-orange-300/70 text-white rounded disabled:cursor-not-allowed'
      disabled={pending}
      onClick={() => {
        setButtonPress('plaid')
      }}>
      Link Bank Details and Pay
      {/* {
        pending ? (<PendingAction />) :
          <>
            {
              bankName === '' ? 'Link Bank Details and Pay' : 'Pay with Bank Details on File'
            }
          </>
      } */}
    </button>
  )
}