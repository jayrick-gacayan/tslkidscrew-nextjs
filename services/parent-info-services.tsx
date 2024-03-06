import { Parent } from "@/models/parent";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";
import { CustomerInfoInputTypes } from "@/types/input-types/customer-info-input-types";

export async function getCustomerInfo(customer_id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customers/${customer_id}`,
    {
      ...authHeaders(token)
    });

  try {
    let response = await result.json();

    return new Result<Parent>({
      response: response,
      data: response.user ?? undefined,
      statusCode: result.status,
      message: result.statusText
    })
  } catch (error) {
    return new Result<Parent>(
      {
        response: undefined,
        error: result.statusText,
        message: result.statusText,
        statusCode: result.status,
      }
    )
  }
}

export async function updateCustomerInfo(
  {
    first_name,
    last_name,
    phone_number,
    emergency_phone_number,
    address_line_one,
    address_line_two,
    city,
    state,
    zip_code,
  }: Partial<CustomerInfoInputTypes>,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customers`,
    {
      method: 'PUT',
      body: JSON.stringify({
        customer: {
          first_name,
          last_name,
          phone_number,
          emergency_phone_number,
          address_line_one,
          address_line_two,
          city,
          state,
          zip_code,
        }
      }),
      ...authHeaders(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<Parent>({
      response: response,
      data: response.customer ?? undefined,
      statusCode: result.status,
      message: result.statusText,
    });

  } catch (error) {
    return new Result<Parent>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status
    })
  }
}