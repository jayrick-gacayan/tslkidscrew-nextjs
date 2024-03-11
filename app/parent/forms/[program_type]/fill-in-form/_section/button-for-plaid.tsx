import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function ButtonForPlaid() {

  const onSuccess = useCallback((public_token: any, metadata: any) => {
    // send public_token to server

  }, []);

  const { open, ready } = usePlaidLink({
    token: '<GENERATED_LINK_TOKEN>',
    onSuccess: onSuccess,
  });

  return (
    <button type="button"
      className={`px-4 py-2 w-44 bg-orange-500 hover:bg-orange-300/70 text-white rounded disabled:cursor-not-allowed`}
      onClick={() => { open() }} disabled={!ready}>
      Link Bank Details and Pay
    </button>
  )
}