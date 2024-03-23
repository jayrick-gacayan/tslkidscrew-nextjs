import { pathRevalidate } from '@/actions/common-actions';
import { addOrUpdateBankDetailsAction } from '@/actions/plaid-actions';
import { Products } from 'plaid';
import { useState, useEffect } from 'react';
import { usePlaidLink, PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { toast, ToastContentProps } from 'react-toastify';

export default function AddBankDetailsUsingPlaid() {
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
    env: 'sandbox',
    publicKey: process.env.NEXT_PLAID_PUBLIC_KEY!,
    clientName: 'TSL Adventures',
    product: [Products.Auth],
    token: linkToken,
    onSuccess: (
      public_token: string,
      metadata: PlaidLinkOnSuccessMetadata
    ) => {
      // console.log('public token', public_token)
      // console.log('metadata', metadata)
      async function addOrUpdateBank(public_token: string, account_id: string) {

        let result = await addOrUpdateBankDetailsAction(public_token, account_id);

        let { message, success } = result;

        toast((props: ToastContentProps<unknown>) => {
          return (<div className='text-black'>{message}</div>)
        }, {
          toastId: `add-or-update-bank-details-${Date.now()}`,
          type: success ? 'success' : 'error',
          hideProgressBar: true,

        });

        if (success) {
          await pathRevalidate('/parent/billing-info-settings');
        }
      }

      addOrUpdateBank(public_token, metadata.accounts[0].id);
    },
  });

  return (
    <>
      <p>If you&#39;d like to use a bank account instead, please link it below.</p>
      <div className='w-fit mr-auto block space-x-4'>
        <button onClick={() => { open(); }}
          disabled={!ready}
          className='p-2 text-white border border-primary rounded bg-primary disabled:cursor-not-allowed'>
          Add Bank Details
        </button>
      </div>
    </>
  );
}