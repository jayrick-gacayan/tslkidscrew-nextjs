import { Invoice } from "@/models/invoice";
import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";

function headers(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    }
  }
}

export async function getAllCustomerInvoices(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/data/get_invoices`,
    {
      ...headers(token!)
    }
  );

  let response = await result.json();

  try {
    if (response.status === 200) {

      return new Result<Paginate<Invoice>>({
        ...response,
        data: {
          data: response.invoice ?? [],
          total: response.total ?? 1,
        },
        statusCode: response.status ?? result.status
      })
    }

    return new Result<Paginate<Invoice>>({
      ...response,
      data: {
        data: [],
        total: 1,
      },
      statusCode: response.status ?? result.status
    })

  } catch (error) {
    return new Result<Paginate<Invoice>>({
      ...response,
      response: response,
      message: response.message ?? result.statusText,
      error: response.message ?? result.statusText,
      statusCode: result.status,
    })
  }
}

export async function getCustomerInvoice(id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/invoices/${id}`,
    {
      ...headers(token!)
    }
  );


  try {
    let response = await result.json();

    return new Result<Invoice>({
      ...response,
      data: response ?? undefined,
      error: result.statusText,
      statusCode: result.status,
    })

  }
  catch (error) {
    return new Result<Invoice>({
      response: undefined,
      message: result.statusText,
      error: result.statusText,
      statusCode: result.status,
    })
  }
}