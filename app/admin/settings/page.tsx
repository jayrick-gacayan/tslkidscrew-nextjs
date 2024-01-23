import AdminHeaderWithEntries from "../_components/admin-header-with-entries";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 lg:px-4">
      <AdminHeaderWithEntries headerText='Settings' />
    </div>
  )
}