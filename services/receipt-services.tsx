import { Paginate } from "@/models/paginate";
import { Receipt } from "@/models/receipt";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";
import { SearchParamsProps } from "@/types/props/search-params-props";

export async function getAllCustomerReceipts(
  searchParams: SearchParamsProps,
  token: string
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let strSP = urlSearchParams.toString();

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/receipts${strSP === '' ? '' : `?${strSP}`}`,
    { ...authHeaders(token!) }
  );

  try {
    let response = await result.json();
    if (response.status === 200) {

      return new Result<Paginate<Receipt>>({
        ...response,
        data: {
          data: response.receipts ?? [],
          total: response.total_receipts ?? 1,
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
      response: undefined,
      message: result.statusText,
      error: result.statusText,
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