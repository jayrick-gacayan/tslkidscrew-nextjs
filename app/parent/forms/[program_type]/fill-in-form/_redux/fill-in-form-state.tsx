import { LocationPlace } from "@/models/location";
import { ChildInfoType } from "@/types/input-types/child-info-type";
import { InputProps } from "@/types/props/input-props";

export interface FillInFormState {
  stripeModalOpen: boolean;
  fillInForm: {
    location: InputProps<Partial<LocationPlace> | undefined>;
    children: ChildInfoType[];

    //for program type before-or-after-school
    yearCycle: InputProps<string>;
    startDate: InputProps<string | undefined>;
    beforeOrAfterWeekDays: InputProps<{ beforeSchool: any[], afterSchool: any[] }>;
    TOSCondition: InputProps<any[]>;

    //for program type summer-camp
    summerCampPackageReg: InputProps<string>;
    promoPackage: {
      week_count: string;
      price: string;
      weeks: []
    } | undefined;
  }
}