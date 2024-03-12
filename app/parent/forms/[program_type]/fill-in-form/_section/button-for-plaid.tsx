import { useEffect, useState } from "react";
import { usePlaidLink, } from "react-plaid-link";


export default function ButtonForPlaid() {
  const [linkToken, setLinkToken] = useState<string>('');

  useEffect(() => {
    async function getLinkToken() {
      const result = await fetch(`/api/create_plaid_link_token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      let response = await result.json();

      // console.log('response', response)
      setLinkToken(response.link_token)

    }

    getLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({

    token: linkToken,
    onSuccess: (public_token: any, metadata: any) => {
      // send public_token to server
      console.log('public token', public_token)
      console.log('metadata', metadata)

    },
  });

  return (
    <button type="button"
      className={`px-4 py-2 w-44 bg-orange-500 hover:bg-orange-300/70 text-white rounded disabled:cursor-not-allowed`}
      onClick={() => { open() }} disabled={!ready}>
      Link Bank Details and Pay
    </button>
  )
}