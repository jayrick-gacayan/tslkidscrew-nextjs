import CustomerInfoForm from './_sections/customer-info-form';

export default async function Page() {

  return (
    <div className='flex-1 w-full h-full'>
      <div className='pb-12'>
        <div className='rounded bg-white drop-shadow-lg p-8 space-y-6'>
          <h1 className='text-[24px] font-bold'>Welcome to TSL!</h1>
          <p>It appears that we have some of your information already. Please confirm by reviewing the following form.</p>
          <CustomerInfoForm />
        </div>
      </div>
    </div>
  );
}