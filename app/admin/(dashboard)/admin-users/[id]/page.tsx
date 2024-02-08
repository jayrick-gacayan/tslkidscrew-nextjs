import { notFound } from "next/navigation";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import BackButtonClient from "../../_components/back-button-client";
import InfoContainer from "../../_components/info-container";
import EditInfoButton from "./_sections/edit-info-button";
import { getAdminUser } from "@/services/admin_services";

export default async function Page({
  params
}: {
  params: {
    id: string
  }
}) {
  // let result = await getAdminUser(params.id);

  // if (!result.data) { notFound(); }

  // let admin = result.data;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Admin Information' />
      <div className="bg-secondary p-6">
        <div className="columns-1 lg:columns-2">
          <InfoContainer label='Name' data='Sample Name' />
          <InfoContainer label='Email' data='email@gmail.com' />
          <InfoContainer label='Super Admin'
            data='Yes' />
          <InfoContainer label='Last Signed In'
            data={
              <div className="space-x-2">
                {new Date().toLocaleDateString('en-US', { month: '2-digit', day: "2-digit", year: "numeric" })} &nbsp;
                {new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
            } />
          <InfoContainer label='Created By' data="N/A" />
        </div>
        <EditInfoButton />
      </div>
    </div>
  )
}