import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location";
import { Admin } from "@/models/admin";

type LocationPlaceInputs = {
  name: string;
  address: string;
  director: Admin;
  minimum_age: number;
}

function headers(token: string) {
  return {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token!}`
    }
  }
}

export async function locationPlaces(
  searchParams: { [key: string]: string | string[] | undefined },
  token?: string | null
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! +
    `/locations${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`,
    {
      ...headers(token!)
    });

  let response = await result.json();

  return new Result<Paginate<LocationPlace>>({
    ...response,
    data: {
      data: response.locations ?? [],
      total: response.total ?? 1,
    } ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function locationPlace(id: string, token?: string) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! +
    `/locations/${id}`,
    {
      ...headers(token!)
    });

  let response = await result.json();

  return new Result<LocationPlace>({
    ...response,
    data: response.location ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function createLocationPlace({
  name,
  address,
  director,
  minimum_age
}: LocationPlaceInputs,
  token: string
) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations`,
    {
      method: "POST",
      body: JSON.stringify({
        location: {
          name,
          address,
          director_id: director.id!,
          minimum_age: minimum_age
        }
      }),
      ...headers(token)
    });

  let response = await result.json();

  return new Result<LocationPlace>({
    ...response,
    data: response.location ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function updateLocationPlace(
  id: string,
  {
    name,
    address,
    director,
    minimum_age
  }: LocationPlaceInputs,
  token: string
) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        location: {
          name,
          address,
          director_id: director.id!,
          minimum_age: minimum_age
        }
      }),
      ...headers(token)
    });

  let response = await result.json();

  return new Result<LocationPlace>({
    ...response,
    data: response.location ?? undefined,
    statusCode: result.status,
    response: response
  });
}

export async function removeLocationPlace(
  id: string,
  token: string
) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    {
      method: "DELETE",
      ...headers(token)
    });

  let response = await result.json();

  return new Result<LocationPlace>({
    ...response,
    data: response.location ?? undefined,
    statusCode: result.status,
    response: response
  });
}