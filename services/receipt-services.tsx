import { Paginate } from "@/models/paginate";
import { Receipt } from "@/models/receipt";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";

export async function getAllCustomerReceipts(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/receipts`,
    { ...authHeaders(token!) }
  );

  let response = await result.json();

  try {
    if (response.status === 200) {

      return new Result<Paginate<Receipt>>({
        ...response,
        data: {
          data: response.receipts ?? [],
          total: response.total ?? 1,
        },
        statusCode: response.status ?? result.status
      })
    }

    return new Result<Paginate<Receipt>>({
      ...response,
      data: {
        data: [],
        total: 1,
      },
      statusCode: response.status ?? result.status
    })

  } catch (error) {
    return new Result<Paginate<Receipt>>({
      ...response,
      response: response,
      message: response.message ?? result.statusText,
      error: response.message ?? result.statusText,
      statusCode: result.status,
    })
  }
}

export async function getCustomerReceipt(id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/receipts/${id}`,
    { ...authHeaders(token!) }
  );


  try {
    let response = await result.json();

    return new Result<Receipt>({
      ...response,
      data: response ?? undefined,
      error: result.statusText,
      statusCode: result.status,
    })

  }
  catch (error) {
    return new Result<Receipt>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}