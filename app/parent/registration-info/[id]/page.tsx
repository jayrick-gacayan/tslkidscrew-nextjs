export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="rounded bg-white drop-shadow-lg p-4 space-y-6">
      <h1 className="font-medium text-[24px]">North Colonie After School</h1>
      <div className="block space-y-2">
        <p className="text-tertiary">ENROLLMENT INFORMATION</p>
        <p>Your enrollment is currently
          <span className="my-1 text-success">ACTIVE</span>.
          To unenroll, please contact your program director.
        </p>
      </div>
    </div>
  )
}