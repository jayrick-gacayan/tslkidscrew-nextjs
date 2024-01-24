import AdminHeaderWithEntries from "../_components/admin-header-with-entries";
import TabsContainer from "./_sections/tabs-container";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-4">
      <AdminHeaderWithEntries headerText='Settings' />
      <TabsContainer />
    </div>
  )
}