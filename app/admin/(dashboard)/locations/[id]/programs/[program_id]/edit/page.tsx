import BackButtonClient from "@/app/_components/back-button-client"
import EditProgramForm from "./sections/edit-program-form"
import { Session } from "next-auth";
import { Result } from "@/models/result";
import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { notFound } from "next/navigation";
import { LocationProgram } from "@/models/location-program";
import { locationProgram } from "@/services/location-program-services";
import { activeAdminUsers } from "@/services/admin-services";

export default async function Page({
  params
}: {
  params: { id: string; program_id: string };
}) {
  let currentAdmin: Session | null = await auth();

  let result: Result<LocationProgram> = await locationProgram(params.program_id, currentAdmin?.user?.accessToken!);

  if (!result.data) { notFound(); }

  let adminResult: Result<Admin[]> = await activeAdminUsers(currentAdmin?.user?.accessToken!);

  let adminData = adminResult.data?.map((admin: Admin) => { return { id: admin.id!, email: admin.email! } }) ?? []

  let locationProgramData: LocationProgram = result.data;
  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <BackButtonClient />
        <h1 className="text-[32px] font-medium text-black">Edit Program</h1>
        <EditProgramForm locationProgram={locationProgramData}
          activeAdmins={adminData} />
      </div>
    </div>
  )
}