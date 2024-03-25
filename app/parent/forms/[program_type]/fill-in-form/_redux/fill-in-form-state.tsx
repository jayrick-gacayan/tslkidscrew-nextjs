import { LocationPlace } from '@/models/location-place';
import { SummerCampPromoSetting } from '@/models/summer-camp-promo-setting';
import { SummerCampWeekSetting } from '@/models/summer-camp-week-setting';
import { VacationCampSetting } from '@/models/vacation-camp-setting';
import { ChildInputTypes } from '@/types/input-types/child-input-types';
import { InputProps } from '@/types/props/input-props';

export interface FillInFormState {
  stripeModalOpen: boolean;
  fillInForm: {
    location: InputProps<Partial<LocationPlace> | undefined>;
    defDateForChildForm: string | undefined;
    arrChildren: ChildInputTypes[];

    //for program type before-or-after-school
    yearCycle: InputProps<string>;
    startDate: InputProps<string | undefined>;
    beforeOrAfterWeekDays: InputProps<{ beforeSchool: any[], afterSchool: any[] }>;
    TOSCondition: InputProps<any[]>;

    //for program type summer-camp
    summerCampPackageReg: InputProps<string>;
    summerCampRegWeeks: InputProps<Partial<SummerCampWeekSetting>[]>;
    promoPackage: InputProps<SummerCampPromoSetting | undefined>;

    //for program type vacation-camp
    vacationCamps: InputProps<Pick<VacationCampSetting, 'id' | 'name' | 'month' | 'year'>[]>;
  }
}