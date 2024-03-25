import { Result } from '@/models/result';
import { authHeaders } from '@/types/helpers/auth-headers';
import { PasswordTypes } from '@/types/input-types/passwords-types';

export async function forgotPassword(email: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/forgot_password`,
    {
      method: 'POST',
      body: JSON.stringify({ customer_user: { email } }),
      headers: { 'Content-Type': 'application/json' }
    }
  );

  try {
    let response = await result.json();

    console.log('response', response)

    return new Result<any>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: response.status ?? result.status,
    })
  }
  catch (error) {
    return new Result<any>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
    })
  }
}

export async function changePassword({ password, password_confirmation }: PasswordTypes, token: string) {
  let urlSearchParams: URLSearchParams = new URLSearchParams();
  urlSearchParams.set('password', password);
  urlSearchParams.set('password_confirmation', password_confirmation);

  let strSP = urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`;

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/forgot_password/change_password${strSP}`,
    {
      method: 'PUT',
      ...authHeaders(token)
    }
  );

  console.log('result', result.status)

  try {
    let response = await result.json();

    console.log('response', response)
    return new Result<any>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: response.status ?? result.status,
    })
  }
  catch (error) {
    return new Result<any>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
    })
  }
}

export async function resetPassword({
  password,
  password_confirmation,
  reset_password_token,
}: PasswordTypes & { reset_password_token: string },
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/forgot_password`,
    {
      method: 'PATCH',
      body: JSON.stringify({ password, password_confirmation, reset_password_token }),
      headers: { 'Content-Type': 'application/json' }
    }
  );

  try {
    let response = await result.json();

    console.log('response', response)

    return new Result<any>({
      response: response,
      message: response.message ?? result.statusText,
      statusCode: response.status ?? result.status,
    })
  }
  catch (error) {
    return new Result<any>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
    })
  }
}
