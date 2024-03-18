import { addOrUpdateBankDetailsAction } from "@/actions/parent-info-actions";
import { Tab } from "@headlessui/react";
import { Products } from "plaid";
import { useEffect, useState } from "react";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";
import { ToastContentProps, toast } from "react-toastify";

export default function BankDetails() {

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
      async function addOrUpdateBank(public_token: string) {

        let result = await addOrUpdateBankDetailsAction(public_token);

        let { message, success } = result;
        toast((props: ToastContentProps<unknown>) => {
          return (<div className='text-black'>{message}</div>)
        }, {
          toastId: `add-or-update-bank-details-${Date.now()}`,
          type: success ? 'success' : 'error',
          hideProgressBar: true,
        });
      }

      addOrUpdateBank(public_token);
      // send public_token to server
      // console.log('public token', public_token)
      // console.log('metadata', metadata)
    },
  });
  return (
    <Tab.Panel as='div' className="space-y-4">
      <p>If you&#39;d like to use a bank account instead, please link it below.</p>
      <div className="w-fit mr-auto block space-x-4">
        <button onClick={() => { open(); }}
          disabled={!ready}
          className='p-2 text-white border border-primary rounded bg-primary disabled:cursor-not-allowed'>
          Add Bank Details
        </button>
      </div>
    </Tab.Panel>
  )
}