import { Parent } from '@/models/parent';
import { Result } from '@/models/result';
import { authHeaders } from '@/types/helpers/auth-headers';

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
      ...authHeaders(token),
    })

  try {
    let response = await result.json();

    if (response.status === 200) {
      return new Result<Parent>(
        {
          response: response,
          data: response.customer_users ?? undefined,
          statusCode: response.status ?? result.status,
          message: response.message ?? result.statusText
        }
      )
    }
    return new Result<Parent>(
      {
        response: response,
        data: undefined,
        statusCode: result.status,
        message: response.message ?? result.statusText
      }
    )
  }
  catch (error) {
    return new Result<Parent>(
      {
        response: undefined,
        message: result.statusText,
        statusCode: result.status
      }
    )
  }
}

export async function unlinkStripeCard(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customer_users/unlink_card`,
    { method: 'PUT', ...authHeaders(token) }
  );

  try {
    let response = await result.json();
    console.log('response', response);
    if (result.status === 200) {
      return new Result<Parent>(
        {
          response: response,
          statusCode: response.status ?? result.status,
          message: response.message ?? result.statusText
        }
      );
    }

    return new Result<Parent>(
      {
        response: response,
        statusCode: response.status ?? result.status,
        message: response.message ?? result.statusText
      }
    );

  }
  catch (error) {
    return new Result<Parent>(
      {
        response: undefined,
        statusCode: result.status,
        message: result.statusText
      }
    )
  }
}