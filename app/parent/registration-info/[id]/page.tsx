import { getRegistrationRecordAction } from '@/actions/registration-record-actions';
import InfoContainer from '@/app/_components/info-container';
import { ChildRecord } from '@/models/child-record';
import { RegistrationRecord } from '@/models/registration-record';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string; } }) {
  let registrationRecord: RegistrationRecord | undefined = await getRegistrationRecordAction(params.id);

  if (!registrationRecord) { notFound(); }

  return (
    <div className='rounded bg-white drop-shadow-lg p-4 space-y-6'>
      <div className='font-[800] text-[32px]'>North Colonie After School</div>
      <div className='block space-y-1'>
        <div className='text-tertiary font-[500]'>
          ENROLLMENT INFORMATION
        </div>
        <p>Your enrollment is currently
          <span className='text-success font-bold ml-1'>ACTIVE</span>.
          To unenroll, please contact your program director.
        </p>
      </div>
      <div className='block space-y-4'>
        <div className='text-tertiary font-[500]'>CHILDREN INFORMATION</div>
        {
          registrationRecord?.child_records!.map((child: ChildRecord, index: number) => {
            return (
              <div key={`registration-child-record-${index}`}
                className='space-y-4'>
                <div className='font-semibold'>Children #{index + 1}</div>
                <div className='bg-secondary rounded p-4'>
                  <div className='columns-1 lg:columns-2 space-y-4'>
                    <InfoContainer label='FIRST NAME' data={child.first_name ?? 'N/A'} />
                    <InfoContainer label='LAST NAME' data={child.last_name ?? 'N/A'} />
                    <InfoContainer label='DATE OF BIRTH' data={child.dob ?? 'N/A'} />
                    <InfoContainer label='SCHOOL ATTENDING' data={child.school_attending ?? 'N/A'} />
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}