import { Result } from '@/models/result';
import { authHeaders } from '@/types/helpers/auth-headers';

export async function addOrUpdateBankDetails(body: any, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customers/update_stripe_information${body}`,
    { method: 'POST', ...authHeaders(token) }
  );

  try {
    let response = await result.json();
    // console.log('response dfasdfds', response);
    return new Result<any>({
      response: response,
      success: response.success ?? false,
      statusCode: result.status,
      message: response.message ?? result.statusText,
    });

  } catch (error) {
    return new Result<any>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status
    })
  }
}

export async function unlinkBankDetails(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customers/unlink_bank`,
    { method: 'PUT', ...authHeaders(token) }
  );

  try {
    let response = await result.json();
    console.log('response', response);
    return new Result<any>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: result.status,
    })

  } catch (error) {
    return new Result<any>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status,
    })
  }
}