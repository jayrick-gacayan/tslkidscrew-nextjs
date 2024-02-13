import { notFound } from "next/navigation";
import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import BackButtonClient from "../../_components/back-button-client";
import InfoContainer from "../../_components/info-container";
import EditInfoButton from "./_sections/edit-info-button";
import { adminUser } from "@/services/admin_services";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { Admin } from "@/models/admin";
import AdminInfoData from "./_sections/admin-info-data";

export default async function Page({
  params
}: {
  params: {
    id: string
  }
}) {
  let currentAdmin: Session<Admin> | null = await auth();
  let result = await adminUser(params.id, currentAdmin?.accessToken);

  if (!result.data) { notFound(); }

  let admin = result.data;

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Admin Information' />
      <div className="bg-secondary p-6">
        <AdminInfoData admin={admin} />
        <EditInfoButton />
      </div>
    </div>
  )
}