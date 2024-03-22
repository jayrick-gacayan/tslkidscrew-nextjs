import { SCHOOL_AGE_CARE_CAMP_PROGRAMS } from '@/types/constants/school-age-care-camp-programs';
import CampCard from './_components/camp-card';

export default function Page() {

  return (
    <div className='flex-1'>
      <div className='pb-12'>
        <div className='gap-6 columns-auto xl:columns-3 place-items-center min-h-[560px] h-full'>
          {
            SCHOOL_AGE_CARE_CAMP_PROGRAMS.map((value: any) => {
              let objectToSend: any = {
                labelText: value.name,
                href: `/parent/forms/${value.altText}`
              };

              if (value.isDisabled) { objectToSend['isDisabled'] = value.isDisabled; }

              return (<CampCard key={`dashboard-parent-${value.name}`} {...objectToSend} />);
            })
          }
        </div>
      </div>
    </div>
  );
}