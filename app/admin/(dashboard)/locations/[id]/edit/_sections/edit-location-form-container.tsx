import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location-place";
import { Result } from "@/models/result";
import { notFound } from "next/navigation";
import { EditFormLocation } from "./edit-form-location";
import { locationPlaceAction } from "@/actions/location-actions";
import { activeAdminUsersAction } from "@/actions/admin-actions";

export default async function EditFormLocationContainer({ id }: { id: string }) {
  let result: Result<LocationPlace> = await locationPlaceAction(id);

  if (!result.data) { notFound(); }

  let activeUsers: Pick<Admin, "id" | "email">[] = await activeAdminUsersAction();

  return (<EditFormLocation locationPlace={result.data} admins={activeUsers} />)
}