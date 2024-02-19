import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location";
import { LocationPlaceInputs } from "@/types/input-types/location-place-input-types";
import { adminUser } from "./admin-services";
import { ResultStatus } from "@/types/enums/result-status";

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

  let strSP = urlSearchParams.toString();
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations${strSP === '' ? '' : `?${strSP}`}`,
    { ...headers(token!) }
  );

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
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    { ...headers(token!) }
  );
  let response = await result.json();
  if (result.status === 200) {
    let adminResult = await adminUser(response.location.director_id, token!);

    if (adminResult.resultStatus === ResultStatus.SUCCESS) {
      response['location']['director'] = adminResult.data ?? null;
    }

    return new Result<LocationPlace>({
      ...response,
      data: response.location,
      statusCode: result.status,
      response: response
    });
  }


  return new Result<LocationPlace>({
    ...response,
    data: undefined,
    statusCode: result.status,
    response: response
  });
}

export async function createLocationPlace({
  name,
  address,
  director_id,
  minimum_age
}: LocationPlaceInputs,
  token: string
) {
  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations`,
    {
      method: "POST",
      body: JSON.stringify({
        ["location"]: {
          name,
          address,
          director_id,
          minimum_age
        }
      }),
      ...headers(token!)
    }
  );

  let response = await result.json();

  console.log('response', response)

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
    director_id,
    minimum_age
  }: LocationPlaceInputs,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        ['location']: {
          name,
          address,
          director_id,
          minimum_age
        }
      }),
      ...headers(token)
    }
  );

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
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    { ...headers(token), method: "DELETE", }
  );

  let response = await result.json();

  return new Result<LocationPlace>({
    ...response,
    data: response.location ?? undefined,
    statusCode: result.status,
    response: response
  });
}