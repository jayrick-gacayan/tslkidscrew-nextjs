import { Admin } from "@/models/admin";
import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";
import { authHeaders } from "@/types/helpers/auth-headers";
import { AdminUserInputs } from "@/types/input-types/admin-input-types";
import { SearchParamsProps } from "@/types/props/search-params-props";

export async function adminUser(id: string, token?: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/${id}`,
    { ...authHeaders(token!) }
  );

  try {
    let response = await result.json();

    return new Result<Admin>({
      ...response,
      data: response.admins ?? undefined,
      statusCode: result.status,
      response: response
    });
  } catch (error) {
    return new Result<Admin>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status,
    });
  }

}

export async function adminUsers(
  searchParams: SearchParamsProps,
  token?: string | null
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let strSP = urlSearchParams.toString();

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts${strSP === '' ? '' : `?${strSP}`}`,
    { ...authHeaders(token!) }
  );

  let response = await result.json();

  return new Result<Paginate<Admin>>({
    ...response,
    data: {
      data: response.admins ?? [],
      total: response.total_admins ?? 1,
    } ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function addAdminUser(
  {
    email,
    name,
    isSuperAdmin
  }: AdminUserInputs,
  token: string
) {

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/create_admin`,
    {
      method: "POST",
      ...authHeaders(token),
      body: JSON.stringify({
        admin: {
          email: email,
          name: name,
          is_super_admin: isSuperAdmin ? "true" : "false",
          active: "true",
        }
      }),
    });

  try {
    let response = await result.json();

    return new Result<Admin>({
      response: response,
      data: response.admins ?? undefined,
      message: response.message ?? result.statusText,
      statusCode: response.status ?? result.status,
    })
  } catch (error) {
    return new Result<Admin>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status,
      error: result.statusText
    })
  }

}

export async function updateAdminUser(
  {
    email,
    name,
    isSuperAdmin,
    isActive
  }: AdminUserInputs,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/edit_admin`,
    {
      method: "POST",
      ...authHeaders(token!),
      body: JSON.stringify({
        admin: {
          email,
          name,
          active: isActive ? 'true' : 'false',
          is_super_admin: isSuperAdmin ? 'true' : 'false'
        }
      })
    });

  try {
    let response = await result.json();

    return new Result<Admin>({
      respose: response,
      ...response,
      data: response.admin ?? undefined,
      message: response.message ?? '',
      statusCode: response.status ?? result.status
    })
  }
  catch (error) {
    return new Result<Admin>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status,
      error: result.statusText
    })
  }
}

export async function changeAdminUserActiveStatus(id: number, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/${id}`,
    {
      method: "DELETE",
      ...authHeaders(token!)
    }
  );

  let response = await result.json();

  return new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  })
}



export async function activeAdminUsers(token?: string | null) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/admin_accounts/active_admins`,
    { ...authHeaders(token!) }
  );

  let response = await result.json();

  return new Result<Admin[]>({
    ...response,
    data: response.admins ?? undefined,
    statusCode: result.status,
    response: response
  });
}