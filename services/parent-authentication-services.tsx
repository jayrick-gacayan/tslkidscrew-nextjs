import { Result } from "@/models/result";

export async function registerParent({
  email,
  password,
  confirm_password
}: {
  email: string;
  password: string;
  confirm_password: string
}) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/register`,
    {
      method: "POST",
      body: JSON.stringify({
        customer_user: {
          email,
          password,
          confirm_password
        }
      }),
      headers: { 'Content-Type': 'application/json' }
    });


  let response = await result.json();

  try {
    return new Result<any>({
      ...response,
      data: response.user ?? undefined,
      response: response,
      statusCode: response.status ?? result.status,
    });
  } catch (error) {
    return new Result<any>({
      ...response,
      response: response,
      message: response.message ?? result.statusText,
      error: response.message ?? result.statusText,
      statusCode: result.status,
    })
  }
}