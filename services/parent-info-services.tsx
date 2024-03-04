import { Parent } from "@/models/parent";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";

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