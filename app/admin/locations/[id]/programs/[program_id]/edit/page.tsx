import EditProgramForm from "./sections/edit-program-form"

export default function Page(props: any) {
  console.log('props', props)
  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <h1 className="text-[32px] font-medium text-black">Edit Program</h1>
        <EditProgramForm />
      </div>
    </div>
  )
}