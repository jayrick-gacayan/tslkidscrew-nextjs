import RegistrationInfoHeader from "./_sections/registration-info-header";
import RegistrationInfoTable from "./_sections/registration-info-table";

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <RegistrationInfoHeader />
      <RegistrationInfoTable />
    </div>
  )
}