import CampCard from "./_components/camp-card";

export default function Page() {
  return (
    <div className="columns-3 gap-8">
      <CampCard labelText='Subsidized Enrollment' isDisabled={true} />
      <CampCard labelText='Nursery School' isDisabled={true} />
      <CampCard labelText='Single Day' isDisabled={true} />
      <CampCard labelText='Subsidized Enrollment' isDisabled={true} />
      <CampCard labelText='Request a Daycare Tour' isDisabled={true} />
      <CampCard labelText='Before/After School' />
      <CampCard labelText='Summer Camp' />
      <CampCard labelText='Vacation Camp' />
      <CampCard labelText='Weekend Fun Club' isDisabled={true} />
    </div>
  )
}