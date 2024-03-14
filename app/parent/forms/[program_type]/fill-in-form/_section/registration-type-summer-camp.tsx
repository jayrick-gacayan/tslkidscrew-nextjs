import { useMemo } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import {
  summerCampPackageRegChanged,
  summerCampPromoSet
} from "../_redux/fill-in-form-slice";
import SummerCampPackageRegularContainer from "./summer-camp-package-regular-container";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import WeekPromos from "../_components/week-promos";

export default function RegistrationTypeSummerCamp({
  summerCampPromos,
  summerCampWeeks
}: {
  summerCampPromos: SummerCampPromoSetting[];
  summerCampWeeks: Partial<SummerCampWeekSetting>[];
}) {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const summerCampPackageReg = useMemo(() => {
    return fillInFormState.fillInForm.summerCampPackageReg;
  }, [fillInFormState.fillInForm.summerCampPackageReg]);

  const children = useMemo(() => { return fillInFormState.fillInForm.children; }, [fillInFormState.fillInForm.children])

  const promoPackage = useMemo(() => {
    return fillInFormState.fillInForm.promoPackage
  }, [fillInFormState.fillInForm.promoPackage])

  function renderRegTypeRadio(value: string, current: string) {
    return (
      <span className="rounded-full border border-warning h-5 w-5 p-1">
        <span className={`transition-all duration-100 ${value === current ? 'bg-warning' : 'bg-transparent'} h-full w-full block rounded-full`} />
      </span>
    )
  }

  function summerCampRegHandleChanged(value: string) {
    reduxStore.dispatch(summerCampPackageRegChanged(fieldInputValue(value)))
  }

  const filterMemo = useMemo(() => {
    return summerCampPromos.filter((val: SummerCampPromoSetting) => {
      return val.child_record_count === children.length &&
        val.week_count !== 0 && !val.with_swim_trip
    })
  }, [summerCampPromos, children])

  const sixWeekPromo = filterMemo.filter((val: SummerCampPromoSetting) => {
    return val.week_count === 6
  });

  const sevenWeekPromo = filterMemo.filter((val: SummerCampPromoSetting) => {
    return val.week_count === 7
  });

  const eightWeekPromo = filterMemo.filter((val: SummerCampPromoSetting) => {
    return val.week_count === 8
  });

  const nineWeekPromo = filterMemo.filter((val: SummerCampPromoSetting) => {
    return val.week_count === 9
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-black">
        <h1 className="font-medium text-[36px]">Choose your registration type</h1>
      </div>
      <div className="space-y-2">
        <div className="space-y-2">
          <FormsRadioButton name="reg-type-summer-camp"
            labelText='The Kids Crew Summer Specials: Pay for summer upfront SAVE 10%, and no registration fee.'
            value='promo'
            current={summerCampPackageReg.value}
            renderRadio={renderRegTypeRadio}
            labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
            onChange={summerCampRegHandleChanged} />
          <FormsRadioButton labelText='Regular Registration'
            value='regular'
            name="reg-type-summer-camp"
            current={summerCampPackageReg.value}
            renderRadio={renderRegTypeRadio}
            labelClassName='transition-all duration-100 has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
            onChange={summerCampRegHandleChanged} />
        </div>
      </div>
      {
        summerCampPackageReg.errorText !== '' &&
        (<div className="text-danger">{summerCampPackageReg.errorText}</div>)
      }
      {
        summerCampPackageReg.value !== '' &&
        (
          <div className="block">
            {
              summerCampPackageReg.value === 'regular' ?
                (
                  <SummerCampPackageRegularContainer summerCampWeeks={summerCampWeeks} />
                ) :
                (
                  <div className="space-y-4 bg-secondary rounded p-4">
                    <h1 className="text-[24px]">Promo Package registration</h1>
                    <div>Number of Children: {children.length}</div>
                    <div className="font-medium">Week Promos</div>
                    <div className="flex items-stretch justify-evenly gap-4">
                      <WeekPromos weekNum={6}
                        summerCampPerWeekPromos={sixWeekPromo}
                        promoPackage={promoPackage.value}
                        onChange={(val: SummerCampPromoSetting) => {
                          reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                        }} />
                      <WeekPromos weekNum={7}
                        summerCampPerWeekPromos={sevenWeekPromo}
                        promoPackage={promoPackage.value}
                        onChange={(val: SummerCampPromoSetting) => {
                          reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                        }} />
                      <WeekPromos weekNum={8}
                        summerCampPerWeekPromos={eightWeekPromo}
                        promoPackage={promoPackage.value}
                        onChange={(val: SummerCampPromoSetting) => {
                          reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                        }} />
                      <WeekPromos weekNum={9}
                        summerCampPerWeekPromos={nineWeekPromo}
                        promoPackage={promoPackage.value}
                        onChange={(val: SummerCampPromoSetting) => {
                          reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                        }} />
                    </div>
                  </div>
                )
            }
          </div>
        )
      }
    </div>
  )
}