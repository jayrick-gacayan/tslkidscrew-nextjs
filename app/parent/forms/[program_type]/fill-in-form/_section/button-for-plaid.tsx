import { Products } from 'plaid';
import { useEffect, useState } from 'react';
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from 'react-plaid-link';

export default function ButtonForPlaid({
  program_type
}: {
  program_type: string;
}) {
  const [linkToken, setLinkToken] = useState<string>('');

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

  const { open, ready } = usePlaidLink({
    publicKey: process.env.NEXT_PLAID_PUBLIC_KEY!,
    env: process.env.NEXT_PLAID_SECRET_KEY!,
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

  return (
    <button type='button'
      onClick={() => { open() }}
      className='px-4 py-2 w-44 bg-orange-500 hover:bg-orange-300/70 text-white rounded disabled:cursor-not-allowed'
      disabled={!ready}>
      Link Bank Details and Pay
    </button>
  )
}