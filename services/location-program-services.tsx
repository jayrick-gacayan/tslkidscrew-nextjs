import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location-place";
import { LocationProgram } from "@/models/location-program";
import { Result } from "@/models/result";
import { adminUser } from "./admin-services";
import { locationPlace } from "./location-services";
import { Paginate } from "@/models/paginate";
import { authHeaders } from "@/types/helpers/auth-headers";
import { SearchParamsProps } from "@/types/props/search-params-props";
import { LocationProgramInputs } from "@/types/input-types/location-program-input-types";

export async function locationProgram(id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs/${id}`,
    { ...authHeaders(token!) }
  );

  let response = await result.json();

  if (result.status === 200) {
    let director = await adminUser(response.program.director_id, token);
    let locationPlaceData = await locationPlace(response.program.location_id, token);

    return new Result<LocationProgram>({
      ...response,
      data: {
        ...response.program,
        director: director.data,
        locationPlace: locationPlaceData.data
      },
      statusCode: result.status,
      response: response
    });

  }

  return new Result<LocationProgram>({
    ...response,
    data: response.program ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function locationPrograms(
  searchParams: SearchParamsProps,
  location_id: string,
  token: string
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])
  urlSearchParams.set('location_id', location_id)
  let strSP = urlSearchParams.toString();

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs?${strSP}`,
    { ...authHeaders(token!) }
  )

  let response = await result.json();

  return new Result<Paginate<LocationProgram>>({
    ...response,
    data: {
      data: response.programs ?? [],
      total: response.total_programs ?? 1,
    },
    statusCode: result.status
  })
}

export async function addLocationProgram(
  {
    name,
    name_suffix,
    location_id,
    director_id,
    active,
    capacity,
    is_package_active,
  }: LocationProgramInputs,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs`,
    {
      method: "POST",
      body: JSON.stringify({
        program: {
          location_id,
          name,
          name_suffix,
          director_id,
          active,
          capacity,
          is_package_active,
        }
      }),
      ...authHeaders(token!)
    }
  )

  try {
    let response = await result.json();

    console.log('result status', result.status, location_id)
    console.log('response', response)
    return new Result<LocationProgram>({
      ...response,
      data: response.program ?? undefined,
      statusCode: result.status,
      message: response.message ?? result.statusText
    })
  }
  catch (error) {
    return new Result<LocationProgram>({
      response: undefined,
      message: result.statusText,
      statusCode: result.status
    })
  }
}

export async function removeLocationProgram(
  id: number,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs/${id}`,
    {
      ...authHeaders(token!),
      method: "DELETE"
    }
  );

  let response = await result.json();

  return new Result<LocationProgram>({
    ...response,
    data: response.program ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function updateLocationProgram(
  {
    name,
    name_suffix,
    location_id,
    director_id,
    active,
    capacity,
    is_package_active,
  }: LocationProgramInputs,
  id: number,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        program: {
          location_id,
          name,
          name_suffix,
          director_id,
          active,
          capacity,
          is_package_active,
        }
      }),
      ...authHeaders(token!)
    }
  )

  try {
    let response = await result.json();

    return new Result<LocationProgram>({
      ...response,
      data: response.program ?? undefined,
      statusCode: result.status,
      response: response
    });

  } catch (error) {
    return new Result<LocationPlace>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText,
      error: result.statusText
    });
  }
}