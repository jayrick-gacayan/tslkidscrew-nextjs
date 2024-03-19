import { Paginate } from "@/models/paginate";
import { RegistrationRecord } from "@/models/registration-record";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";

export async function getRegistrationRecord(reg_id: string, token: string) {

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/registration_records/regis_info_show?reg_id=${reg_id}`,
    { ...authHeaders(token) }
  );

  try {
    let response = await result.json();

    return new Result<RegistrationRecord>({
      response: response,
      data: response.status === 200 ? { id: parseInt(reg_id), child_records: response.child_records } : undefined,
      message: response.message ?? result.statusText,
      statusCode: response.status ?? result.status
    })

  } catch (error) {
    return new Result<RegistrationRecord>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status
    })
  }
}

export async function getRegistrationRecords(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/customer_users/regis_records`,
    { ...authHeaders(token) }
  );

  try {
    let response = await result.json();

    if (response.status === 200) {

      return new Result<Paginate<any>>({
        ...response,
        data: {
          data: response.registrations ?? [],
          total: response.total_invoices ?? 1,
        },
        statusCode: response.status ?? result.status
      })
    }

    return new Result<Paginate<any>>({
      ...response,
      data: undefined,
      statusCode: response.status ?? result.status
    })

  } catch (error) {
    return new Result<Paginate<any>>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status
    })
  }
}