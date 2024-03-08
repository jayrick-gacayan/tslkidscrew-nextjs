import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location";
import { Result } from "@/models/result";
import { activeAdminUsers } from "@/services/admin-services";
import { locationPlace } from "@/services/location-services";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import { EditFormLocation } from "./edit-form-location";

export default async function EditFormLocationContainer({ id }: { id: string }) {
  let admin: Session | null = await auth();

  let result: Result<LocationPlace> = await locationPlace(id, admin?.user?.accessToken)

  if (!result.data) { notFound(); }

  let locationPlaceData: LocationPlace = result.data;

  let resultData: Result<Admin[]> = await activeAdminUsers(admin?.user?.accessToken!);

  let data = resultData.data?.map((admin: Admin) => { return { id: admin.id!, email: admin.email! } }) ?? []

  return (<EditFormLocation locationPlace={locationPlaceData} admins={data} />)
}