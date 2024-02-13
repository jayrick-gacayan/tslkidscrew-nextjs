import { Admin } from "@/models/admin";
import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";

export async function adminUser(id: string, token?: string) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! +
    `/admin_accounts/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token!}`
      }
    });

  let response = await result.json();

  return new Result<Admin>({
    ...response,
    data: response.admins ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function adminUsers(
  searchParams: { [key: string]: string | string[] | undefined },
  token?: string | null
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! +
    `/admin_accounts${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token!}`
      }
    });

  let response = await result.json();

  return new Result<Paginate<Admin>>({
    ...response,
    data: {
      data: response.admins ?? [],
      total: response.total ?? 20,
    } ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function addAdminUser(adminUserInput: {
  email: string,
  name: string,
  isActive: string,
  isSuperAdmin: string,
}) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_URL + `/admins/admin-users`,
    {
      method: "POST",
      body: JSON.stringify({
        email: adminUserInput.email,
        name: adminUserInput.name,
        is_active: adminUserInput.isActive,
        is_super_admin: adminUserInput.isSuperAdmin
      }),
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmU3NTljNWNjZGI4ODA0ZGRmYjQ1ZmJlOGQ4YzI1ZjQxMTIzMzA5Nzk1N2UxNzhiYjE4MjJkN2MwNjMwNDY3YWY1OGI3NGJhOTZjOGM2MzYiLCJpYXQiOjE3MDcxODU4MDguODkyODMyLCJuYmYiOjE3MDcxODU4MDguODkyODM5LCJleHAiOjE3Mzg4MDgyMDguNTY4NjcxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.I4a2KBfxawNXQptSWLTHjDHi5OkISzsCQbbRVdU4dZhEfgsgQdwfWRkUut-hcStXmpqpDpT-d7b2xP8MaHOBSByaO0rWUhjttfa3EAe4WfIXJ54xoL0MORRyR6D0qyHciKl7z8guKxFc2RX2Ry9NkPUXfAjENpuGV5_W-pwVTeodW8A6hFYyMlFi8szcC08MPaLeJA2E2DIrHMAd1TbQ8_HQ_lM2LMDtEmEgsMxnioitQ6iGxIvq6ScqKnJo2gBLh3ZabVeyNkf2pu2wiwgQt6CMsfvH0aW13Zy1RA6y7mbQ-ZLJhuFI6ZM_SpP__DxMj4H5eyWuDz5OCxD7CLsHAKYNL1Dlupwf6I2nKNEmnj_GA7T2bRbgy81aTz5NhFIrCU_mjt4MZScK6ibYNpBzXAcGMh6_zGzPWt_ciMUT55IhvIVKrtSJvgouhiH58YLYSZ-pVR4kvlSAg4F71DB3pyhWJSCm-5yhzSJ5hNrcPa8TkQz3s64nZYIXUnSuBPyywP8qcmWjLnlaGzQG8azK-W2gfCYu8EtaVgX-Z-FdPIj7dbQyJ_xJcwLEP5aZl7tB0oQhEQETKahHH9O-tnLMl2Wb8PuxL_HnVnuRErvNkRXQ4JhoHEfn2L7z1D3IFurIxOO8VUpdUDUqcnI29xMz4elnTHoW3l6u_ommsrgXA_0"
      }
    });

  let response = await result.json();

  return new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  })
}

export async function removeAdminUser(id: number) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_URL + `/admins/admin-users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmU3NTljNWNjZGI4ODA0ZGRmYjQ1ZmJlOGQ4YzI1ZjQxMTIzMzA5Nzk1N2UxNzhiYjE4MjJkN2MwNjMwNDY3YWY1OGI3NGJhOTZjOGM2MzYiLCJpYXQiOjE3MDcxODU4MDguODkyODMyLCJuYmYiOjE3MDcxODU4MDguODkyODM5LCJleHAiOjE3Mzg4MDgyMDguNTY4NjcxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.I4a2KBfxawNXQptSWLTHjDHi5OkISzsCQbbRVdU4dZhEfgsgQdwfWRkUut-hcStXmpqpDpT-d7b2xP8MaHOBSByaO0rWUhjttfa3EAe4WfIXJ54xoL0MORRyR6D0qyHciKl7z8guKxFc2RX2Ry9NkPUXfAjENpuGV5_W-pwVTeodW8A6hFYyMlFi8szcC08MPaLeJA2E2DIrHMAd1TbQ8_HQ_lM2LMDtEmEgsMxnioitQ6iGxIvq6ScqKnJo2gBLh3ZabVeyNkf2pu2wiwgQt6CMsfvH0aW13Zy1RA6y7mbQ-ZLJhuFI6ZM_SpP__DxMj4H5eyWuDz5OCxD7CLsHAKYNL1Dlupwf6I2nKNEmnj_GA7T2bRbgy81aTz5NhFIrCU_mjt4MZScK6ibYNpBzXAcGMh6_zGzPWt_ciMUT55IhvIVKrtSJvgouhiH58YLYSZ-pVR4kvlSAg4F71DB3pyhWJSCm-5yhzSJ5hNrcPa8TkQz3s64nZYIXUnSuBPyywP8qcmWjLnlaGzQG8azK-W2gfCYu8EtaVgX-Z-FdPIj7dbQyJ_xJcwLEP5aZl7tB0oQhEQETKahHH9O-tnLMl2Wb8PuxL_HnVnuRErvNkRXQ4JhoHEfn2L7z1D3IFurIxOO8VUpdUDUqcnI29xMz4elnTHoW3l6u_ommsrgXA_0"
      }
    });

  let response = await result.json();

  return new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  })
}
