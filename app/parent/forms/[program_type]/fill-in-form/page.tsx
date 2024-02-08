import FillInFormProvider from "./_context/fill-in-form-provider";
import FormActionContainer from "./_section/form-action-container";

export async function generateStaticParams(): Promise<{ program_type: string; }[]> {
  return [
    { program_type: 'vacation-camp' },
    { program_type: 'summer-camp' },
    { program_type: 'before-or-after-school' }
  ]
}

export default function Page({
  params,
  searchParams,
}: {
  params: { program_type: string }
  searchParams: { [key: string]: string | string[] | undefined; }
}) {
  const { program_type } = params;
  const step = typeof searchParams.step === 'string' ? searchParams.step : undefined;

  return (
    <FillInFormProvider>
      <div className='pb-12 w-full'>
        <div className="rounded drop-shadow bg-white w-full xl:w-8/12 m-auto block p-6 max-h-fit">
          <FormActionContainer program_type={program_type} step={step} />
        </div>
      </div>
    </FillInFormProvider>

  )
}