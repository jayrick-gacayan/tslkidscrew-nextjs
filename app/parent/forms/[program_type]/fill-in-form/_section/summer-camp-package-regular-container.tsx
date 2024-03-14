import { useAppSelector } from "@/hooks/redux-hooks";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { useMemo } from "react";
import Link from "next/link";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { summerCampRegWeeksSet } from "../_redux/fill-in-form-slice";

export default function SummerCampPackageRegularContainer({
  summerCampWeeks,
}: {
  summerCampWeeks: Partial<SummerCampWeekSetting>[];
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const summerCampRegWeeks = useMemo(() => {
    return fillInFormState.fillInForm.summerCampRegWeeks
  }, [fillInFormState.fillInForm.summerCampRegWeeks]);

  return (
    <div className="space-y-4">
      <div className="font-medium text-[18px]">
        If a week is not shown, it means that it is at the capacity. Contact
        <Link href='mailto:tsladventures@gmail.com'
          className="text-primary hover:underline mx-1">
          tsladventures@gmail.com
        </Link>
        to request being added to any closed week. Your request may or may not be accommodated.
      </div>
      <div className="space-y-1">
        {
          summerCampWeeks.map((summerCampRegWeek: Partial<SummerCampWeekSetting>) => {
            return (
              <InputCheckboxCustom key={`summer-camp-reg-weeks-${summerCampRegWeek.id}`}
                id={`summer-camp-reg-weeks-${summerCampRegWeek.id}`}
                labelText={summerCampRegWeek.name}
                name='summer-camp-reg-weeks[]'
                checked={summerCampRegWeeks.find((value: Partial<SummerCampWeekSetting>) => {
                  return value.id === summerCampRegWeek.id;
                }) ? true : false}
                value={summerCampRegWeek.id}
                onChange={() => {


                  reduxStore.dispatch(summerCampRegWeeksSet(
                    summerCampRegWeeks.find((value: Partial<SummerCampWeekSetting>) => {
                      return summerCampRegWeek.id === value.id;
                    }) ? summerCampRegWeeks.filter((summerCampWeekReg: Partial<SummerCampWeekSetting>) => {
                      return summerCampRegWeek.id !== summerCampWeekReg.id
                    }) : [...summerCampRegWeeks, summerCampRegWeek]
                  ))
                }}
              />
            );
          })
        }
      </div>
    </div>
  );
}