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

}

export async function addLocationProgram(token: string) { }

export async function removeLocationProgram(id: string, token: string) {
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

export async function updateLocationProgram(token: string) { }