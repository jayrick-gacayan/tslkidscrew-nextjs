import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location";
import { LocationProgram } from "@/models/location-program";
import { Result } from "@/models/result";
import { adminUser } from "./admin-services";
import { locationPlace } from "./location-services";
import { Paginate } from "@/models/paginate";

function headers(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    }
  }
}

export async function locationProgram(id: string, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs/${id}`,
    { ...headers(token!) }
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
  searchParams: { [key: string]: string | string[] | undefined },
  location_id: string,
  token: string
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])
  urlSearchParams.set('location_id', location_id)
  let strSP = urlSearchParams.toString();

  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs?${strSP}`,
    {
      ...headers(token!)
    }
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

export async function addLocationProgram({
  name,
  name_suffix,
  location_id,
  director_id,
  active,
  capacity,
  is_package_active,
}: {
  name: string;
  name_suffix: string;
  location_id: string;
  director_id: string;
  active: string;
  capacity: string;
  is_package_active: string;
}, token: string) {
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
          subsidized_enrollment_enabled: 'false'
        }

      }),
      ...headers(token!)
    }
  )

  try {
    let response = await result.json();

    return new Result<LocationProgram>({
      ...response,
      data: response.program ?? undefined,
      statusCode: response.status ?? result.status,
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
  id: string,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs/${id}`,
    { ...headers(token!), method: "DELETE" }
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
    locationPlace,
    director,
  }: {
    name: string;
    name_suffix: string;
    locationPlace: LocationPlace;
    director: Admin;
  },
  id: string,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        program: {
          location_id: locationPlace.id!.toString(),
          name,
          name_suffix,
          director_id: director.id!.toString(),
        }
      }),
      ...headers(token!)
    }
  )
}