import { Admin } from "@/models/admin";
import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";

type AdminUserInputs = {
  email: string,
  name: string,
  isSuperAdmin: boolean,
}

function headers(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    }
  }
}

export async function adminUser(id: string, token?: string) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! +
    `/admin_accounts/${id}`,
    {
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

export async function addAdminUser({ email, name, isSuperAdmin }: AdminUserInputs, token: string) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/create_admin`,
    {
      method: "POST",
      body: JSON.stringify({
        admin: {
          email: email,
          name: name,
          is_super_admin: isSuperAdmin ? "true" : "false"
        }
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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

export async function updateAdminUser({ email, name, isSuperAdmin, isActive }: AdminUserInputs & { isActive: boolean }, token: string) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/edit_admin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        admin: {
          email,
          name,
          active: isActive ? 'true' : 'false',
          is_super_admin: isSuperAdmin ? 'true' : 'false'
        }
      })
    });

  let response = await result.json();

  return new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  })
}

export async function adminUserInactive(id: number, token: string) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

  let response = await result.json();
  // console.log('response', response)
  return new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  })
}
