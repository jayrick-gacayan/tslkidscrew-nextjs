import AdminHeaderWithEntries from "../../_components/admin-header-with-entries";
import BackButtonClient from "../../../../_components/back-button-client";
import AdminInfoContainer from "./_sections/admin-info-container";

export default function Page({ params }: { params: { id: string } }) {

  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Admin Information' />
      <AdminInfoContainer id={params.id} />
    </div>
  )
}