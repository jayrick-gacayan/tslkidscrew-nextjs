import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location";
import { LocationProgram } from "@/models/location-program";
import { Result } from "@/models/result";

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

  return new Result<LocationProgram>({
    ...response,
    data: response.program ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function locationPrograms(token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs`,
    {
      ...headers(token!)
    }
  )
}

export async function addLocationProgram({
  name,
  name_suffix,
  locationPlace,
  director,
}: {
  name: string;
  name_suffix: string;
  locationPlace: LocationPlace;
  director: Admin;
}, token: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/programs`,
    {
      method: "POST",
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