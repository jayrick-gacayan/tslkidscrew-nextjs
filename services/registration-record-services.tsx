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