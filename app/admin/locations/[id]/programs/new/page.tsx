import NewProgramForm from "./sections/new-program-form"

export default function Page(props: any) {
  console.log('props', props)
  return (
    <div className="rounded bg-white drop-shadow-lg p-4">
      <div className="w-full lg:w-6/12 m-auto block space-y-8">
        <h1 className="text-[32px] font-medium text-black">New Program</h1>
        <NewProgramForm />
      </div>
    </div>
  )
}