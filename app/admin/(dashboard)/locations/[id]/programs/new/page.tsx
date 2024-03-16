import BackButtonClient from "@/app/_components/back-button-client"
import NewProgramForm from "./sections/new-program-form"
import type { Metadata } from "next";
import { Result } from "@/models/result";
import { Admin } from "@/models/admin";
import { LocationPlace } from "@/models/location-place";
import { notFound } from "next/navigation";
import { activeAdminUsersAction } from "@/actions/admin-actions";
import { locationPlaceAction } from "@/actions/location-actions";

export const metadata: Metadata = {
  title: 'Create Location Program',
  description: 'Create Location Program Page'
}

export default async function Page({
  params
}: {
  params: { id: string; }
}) {
  let activeAdmins: Pick<Admin, "id" | "email">[] = await activeAdminUsersAction();
  let result: Result<LocationPlace> = await locationPlaceAction(params.id);
  if (!result.data) { notFound(); }

  return (
    <div className="pb-8">
      <div className="rounded bg-white drop-shadow-lg p-4">
        <div className="w-full lg:w-6/12 m-auto block space-y-8">
          <BackButtonClient />
          <h1 className="text-[32px] font-medium text-black">New Program</h1>
          <NewProgramForm activeAdmins={activeAdmins} locationPlace={result.data} />
        </div>
      </div>
    </div>

  )
}