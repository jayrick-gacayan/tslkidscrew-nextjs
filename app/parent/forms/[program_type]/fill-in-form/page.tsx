import FillInFormButtons from "./_section/fill-in-form-buttons";
import FillInFormContainer from "./_section/fill-in-form-container";

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
    <div className='pb-12'>
      <div className="rounded drop-shadow bg-white w-8/12 m-auto block p-6 space-y-6 max-h-fit">
        <FillInFormContainer program_type={program_type} step={step} />
        <FillInFormButtons program_type={program_type} step={step} />
      </div>
    </div>
  )
}