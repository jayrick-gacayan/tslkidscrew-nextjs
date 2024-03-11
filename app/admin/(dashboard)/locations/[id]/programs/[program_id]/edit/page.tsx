import BackButtonClient from "@/app/_components/back-button-client"
import EditProgramForm from "./sections/edit-program-form"
import { Result } from "@/models/result";
import { Admin } from "@/models/admin";
import { notFound } from "next/navigation";
import { LocationProgram } from "@/models/location-program";
import { locationProgramAction } from "@/actions/location-program-actions";
import { activeAdminUsersAction } from "@/actions/admin-actions";

export default async function Page({
  params
}: {
  params: { id: string; program_id: string };
}) {
  let locationProgram: Result<LocationProgram> = await locationProgramAction(params.program_id);
  if (!locationProgram.data) { notFound(); }
  let activeUsers: Pick<Admin, "id" | "email">[] = await activeAdminUsersAction();

  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">Edit Program</h1>
        <EditProgramForm locationProgram={locationProgram.data} activeAdmins={activeUsers} />
      </div>
    </div>
  )
}