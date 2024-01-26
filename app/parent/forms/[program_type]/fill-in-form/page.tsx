import ChildrenForm from "./children-form";
import LocationForm from "./location-form";

export default function Page() {
  return (
    <div className="rounded drop-shadow bg-white w-8/12 m-auto block p-6 space-y-6 max-h-fit">
      {/* <LocationForm /> */}
      <ChildrenForm />
    </div>
  )
}