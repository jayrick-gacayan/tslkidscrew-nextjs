import { Admin } from "@/models/admin";
import InfoContainer from "../../../_components/info-container";

export default async function AdminInfoData({
  admin
}: {
  admin: Admin
}) {
  return (
    <>
      <div className="columns-1 lg:columns-2">
        <InfoContainer label='Name' data={admin.name ?? 'N/A'} />
        <InfoContainer label='Email' data={admin.email ?? 'N/A'} />
        <InfoContainer label='Super Admin'
          data={
            admin.is_super_admin === undefined || !admin.is_super_admin ? 'No' : 'Yes'
          } />
        <InfoContainer label='Last Signed In'
          data={
            <div className="space-x-2">
              {new Date(admin.updated_at!).toLocaleDateString('en-US', { month: '2-digit', day: "2-digit", year: "numeric" })} &nbsp;
              {new Date(admin.updated_at!).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </div>
          } />
        <InfoContainer label='Created By' data="N/A" />
      </div>
    </>
  )
}