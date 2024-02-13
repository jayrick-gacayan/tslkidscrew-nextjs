import { Paginate } from "@/models/paginate";
import { Result } from "@/models/result";
import { LocationPlace } from "@/models/location";

export async function locationPlaces(
  searchParams: { [key: string]: string | string[] | undefined },
  token?: string | null
) {
  let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

  let result = await fetch(process.env.NEXT_PUBLIC_API_ADMIN_URL! +
    `/locations${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token!}`
      }
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
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token!}`
      }
    });

  let response = await result.json();

  return new Result<LocationPlace>({
    ...response,
    data: response.location ?? undefined,
    statusCode: result.status,
    response: response
  });
}