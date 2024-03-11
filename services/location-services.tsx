import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location-place";
import { LocationPlaceInputs } from "@/types/input-types/location-place-input-types";
import { authHeaders } from "@/types/helpers/auth-headers";
import { SearchParamsProps } from "@/types/props/search-params-props";

export async function locationPlaces(
  searchParams: SearchParamsProps,
  token?: string | null
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let strSP = urlSearchParams.toString();
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations${strSP === '' ? '' : `?${strSP}`}`,
    { ...authHeaders(token!) }
  );

  try {
    let response = await result.json();

    console.log('resposne', response)

    return new Result<Paginate<LocationPlace>>({
      ...response,
      data: {
        data: response.locations ?? [],
        total: response.locations_count ?? 1,
      } ?? undefined,
      statusCode: result.status,
      response: response
    });
  } catch (error) {
    return new Result<Paginate<LocationPlace>>({
      response: undefined,
      statusCode: result.status,
      message: result.statusText
    });
  }


}

export async function locationPlace(id: string, token?: string) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    { ...authHeaders(token!) }
  );

  try {
    let response = await result.json();

    return new Result<LocationPlace>({
      ...response,
      data: { ...response.location, director: response.director ?? null },
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
      ...authHeaders(token!)
    }
  );

  try {
    let response = await result.json();

    return new Result<LocationPlace>({
      ...response,
      data: response.location ?? undefined,
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
      ...authHeaders(token)
    }
  );

  try {
    let response = await result.json();

    return new Result<LocationPlace>({
      ...response,
      data: response.location ?? undefined,
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

export async function removeLocationPlace(
  id: string,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_ADMIN_URL! + `/locations/${id}`,
    {
      ...authHeaders(token),
      method: "DELETE"
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

export async function getAllLocationsForRegRecordCreate(
  program_name: string,
  token: string
) {
  let result = await fetch(
    process.env.NEXT_PUBLIC_API_PARENT_URL! + `/data/get_locations?program_name=${encodeURIComponent(program_name)}`,
    { ...authHeaders(token) }
  );

  let response = await result.json();


  return new Result<LocationPlace[]>({
    response: response,
    data: response.locations ?? [],
    statusCode: response.status ?? result.status,
    message: response.message ?? result.statusText
  })
}