import { SCHOOL_AGE_CARE_CAMP_PROGRAMS } from "@/types/constants/school-age-care-camp-programs";
import CampCard from "./_components/camp-card";

export default function Page() {
  return (
    <div className="columns-1 lg:columns-3 gap-8">
      {
        SCHOOL_AGE_CARE_CAMP_PROGRAMS.map((value: any) => {
          let objectToSend: any = { labelText: value.name };

          if (value.isDisabled) { objectToSend['isDisabled'] = value.isDisabled; }

          return (<CampCard key={`dashboard-parent-${value.name}`} {...objectToSend} />);
        })
      }
    </div>
  )
}