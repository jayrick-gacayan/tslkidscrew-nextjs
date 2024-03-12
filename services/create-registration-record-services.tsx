import { Result } from '@/models/result';
import { authHeaders } from '@/types/helpers/auth-headers';

export async function createRegistrationRecord(
  body: string,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/registration_records`,
    {
      method: 'POST',
      body: body,
      ...authHeaders(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<any>({
      response: response,
      data: undefined,
      statusCode: response.status ?? result.status,
      message: response.message ?? result.statusText
    })

  } catch (error) {
    return new Result<any>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    })
  }
}