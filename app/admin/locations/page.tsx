import LocationsHeader from "./_sections/locations-header";
import LocationsTable from "./_sections/locations-table";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <LocationsHeader />
      <LocationsTable />
    </div>
  )
}