import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { adminUser } from "@/services/admin-services";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import AdminInfoData from "./admin-info-data";
import EditInfoButton from "./edit-info-button";

export default async function AdminInfoContainer({ id }: { id: string }) {
  let currentAdmin: Session<Admin> | null = await auth();
  let result = await adminUser(id, currentAdmin?.accessToken);

  if (!result.data) { notFound(); }

  let admin: Admin = result.data;

  return (
    <div className="bg-secondary p-6">
      <AdminInfoData admin={admin} />
      <EditInfoButton admin={admin} />
    </div>
  )
}