import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import InfoContainer from "../../_components/info-container";
import EditInfoButton from "./_sections/edit-info-button";

export default function Page({
  params
}: {
  params: {
    id: string
  }
}) {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <AdminHeaderWithEntries headerText='Admin Information' />
      <div className="bg-secondary p-6">
        <div className="columns-1 lg:columns-2">
          <InfoContainer label='Name' data='Alexis LaRose' />
          <InfoContainer label='Email' data='alexislarose.tsl@gmail.com' />
          <InfoContainer label='Super Admin' data='yes' />
          <InfoContainer label='Last Signed In'
            data={
              <div className="space-x-2">
                {new Date('02/28/18 01:00 AM').toLocaleDateString('en-US', { month: '2-digit', day: "2-digit", year: "numeric" })} &nbsp;
                {new Date('02/28/18 01:00 AM').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
            } />
          <InfoContainer label='Created By' data='alexislarose.tsl@gmail.com' />
        </div>
        <EditInfoButton />
      </div>
    </div>
  )
}