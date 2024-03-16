import { Parent } from '@/models/parent';
import { Result } from '@/models/result';

export async function addCard(
  { stripeToken, stripeEmail }: { stripeToken: string, stripeEmail: string; },
  token: string
) {

  let result = await fetch(process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customer_users/add_card`,
    {
      method: 'POST',
      body: JSON.stringify({
        stripeEmail,
        stripeToken,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token!}`
      }
    })

  try {
    let response = await result.json();

    return new Result<Parent>(
      {
        response: response,
        data: response.customer_users ?? undefined,
        statusCode: response.status ?? result.status,
        message: response.message ?? result.statusText
      }
    )
  }
  catch (error) {
    console.log('error', error)
  }
}