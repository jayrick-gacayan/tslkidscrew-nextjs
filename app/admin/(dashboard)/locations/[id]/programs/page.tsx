import ProgramsHeader from "./_sections/programs-header";
import ProgramsTable from "./_sections/programs-table";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <ProgramsHeader />
      <ProgramsTable />
    </div>
  )
}