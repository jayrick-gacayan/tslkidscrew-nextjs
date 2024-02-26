import { Parent } from "@/models/parent";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";

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
          password_confirmation: confirm_password
        }
      }),
      headers: { 'Content-Type': 'application/json' }
    });

  try {
    let response = await result.json();

    return new Result<any>({
      ...response,
      data: response.user ?? undefined,
      response: response,
      statusCode: response.status ?? result.status,
    });
  } catch (error) {
    return new Result<any>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}

export async function registerCustomer({
  email,
  first_name,
  last_name,
  phone_number,
  emergency_phone_number,
  address_line_one,
  address_line_two,
  city,
  state,
  zip_code,
  how_did_you_here_about_us
}: {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  emergency_phone_number: string;
  address_line_one: string;
  address_line_two: string;
  city: string;
  state: string;
  zip_code: string;
  how_did_you_here_about_us: string;
}, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customers`,
    {
      method: "POST",
      body: JSON.stringify({
        customer: {
          email,
          first_name,
          last_name,
          phone_number,
          emergency_phone_number,
          address_line_one,
          address_line_two,
          city,
          state,
          zip_code,
          how_did_you_here_about_us
        }
      }),
      ...authHeaders(token)
    });

  let response = await result.json();

  return new Result<Parent>({
    ...response,
    data: response.customer ?? undefined,
    message: response.message ?? result.statusText,
    statusCode: result.status
  });
}