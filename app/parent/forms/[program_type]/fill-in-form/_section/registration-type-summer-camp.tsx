import { useCallback, useMemo, useState } from "react";
import FormsRadioButton from "../_components/forms-radio-button";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import {
  summerCampPackageRegChanged,
  summerCampPromoSet,
  summerCampRegWeeksSet
} from "../_redux/fill-in-form-slice";
import { SummerCampPromoSetting } from "@/models/summer-camp-promo-setting";
import { SummerCampWeekSetting } from "@/models/summer-camp-week-setting";
import WeekPromos from "../_components/week-promos";
import Link from "next/link";
import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";

export default function RegistrationTypeSummerCamp({
  summerCampPromos,
  summerCampWeeks,
  summerCampWeeksForPromo
}: {
  summerCampPromos: SummerCampPromoSetting[];
  summerCampWeeks: Partial<SummerCampWeekSetting>[];
  summerCampWeeksForPromo: Partial<SummerCampWeekSetting>[];
}) {
  const [promoPopId, setPromoPopId] = useState(-1);
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm;
  });

  const summerCampPackageReg = useMemo(() => {
    return fillInFormState.fillInForm.summerCampPackageReg;
  }, [fillInFormState.fillInForm.summerCampPackageReg]);

  const weeksForSummerCamp = useMemo(() => {
    return fillInFormState.fillInForm.summerCampRegWeeks
  }, [fillInFormState.fillInForm.summerCampRegWeeks]);

  const arrChildren = useMemo(() => { return fillInFormState.fillInForm.childrenArr; }, [fillInFormState.fillInForm.childrenArr])

  const promoPackage = useMemo(() => {
    return fillInFormState.fillInForm.promoPackage
  }, [fillInFormState.fillInForm.promoPackage])

  const filterMemo = useMemo(() => {
    return summerCampPromos.filter((val: SummerCampPromoSetting) => {
      return val.child_record_count === arrChildren.length &&
        val.week_count !== 0 && !val.with_swim_trip
    })
  }, [summerCampPromos, arrChildren]);

  const weekPromos = useCallback((week_count: number) => {
    return filterMemo.filter((val: SummerCampPromoSetting) => {
      return val.week_count === week_count
    });
  }, [filterMemo]);

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

  function onCheckboxChange(summerCampWeek: Partial<SummerCampWeekSetting>) {
    reduxStore.dispatch(summerCampRegWeeksSet(
      fieldInputValue(
        weeksForSummerCamp.value.find((value: Partial<SummerCampWeekSetting>) => {
          return summerCampWeek.id === value.id;
        }) ? weeksForSummerCamp.value.filter((sumCampWeek: Partial<SummerCampWeekSetting>) => {
          return summerCampWeek.id !== sumCampWeek.id
        }) : [...weeksForSummerCamp.value, summerCampWeek]
      )
    ))
  }

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
            labelClassName='transition-all duration-100 has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-tertiary has-[:checked]:bg-primary has-[:checked]:text-white rounded flex px-4 py-4 gap-2 items-center bg-secondary-light cursor-pointer'
            onChange={summerCampRegHandleChanged}
            disabled={summerCampWeeks.length < 6} />
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
          <div className="block space-y-2">
            {
              summerCampPackageReg.value === 'regular' ?
                (
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
                        summerCampWeeks.map((summerCampWeek: Partial<SummerCampWeekSetting>) => {
                          return (
                            <InputCheckboxCustom key={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                              id={`summer-camp-reg-weeks-${summerCampWeek.id}`}
                              labelText={summerCampWeek.name}
                              name='summer-camp-reg-weeks[]'
                              checked={weeksForSummerCamp.value.find((value: Partial<SummerCampWeekSetting>) => {
                                return value.id === summerCampWeek.id;
                              }) ? true : false}
                              onChange={() => { onCheckboxChange(summerCampWeek); }}
                              value={summerCampWeek.id} />
                          );
                        })
                      }
                    </div>
                    {
                      weeksForSummerCamp.errorText !== '' &&
                      (<div className="text-danger">{weeksForSummerCamp.errorText}</div>)
                    }
                  </div>
                ) :
                (
                  <>
                    <div className="space-y-4 bg-secondary rounded p-4">
                      <h1 className="text-[24px]">Promo Package registration</h1>
                      <div>Number of Children: {arrChildren.length}</div>
                      <div className="font-medium">Week Promos</div>
                      <div className="w-full overflow-auto">
                        <div className="w-full min-w-[1024px] pb-8">
                          <div className="flex items-stretch justify-evenly gap-4 w-full">
                            <WeekPromos weekNum={6}
                              summerCampPerWeekPromos={weekPromos(6)}
                              promoPackage={promoPackage.value}
                              onChange={(val: SummerCampPromoSetting) => {
                                reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                              }}
                              summerCampWeeksForPromo={summerCampWeeks}
                              weeksForSummerCamp={weeksForSummerCamp.value}
                              onCheckboxChange={onCheckboxChange} />
                            <WeekPromos weekNum={7}
                              summerCampPerWeekPromos={weekPromos(7)}
                              promoPackage={promoPackage.value}
                              onChange={(val: SummerCampPromoSetting) => {
                                reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                              }}
                              summerCampWeeksForPromo={summerCampWeeks}
                              weeksForSummerCamp={weeksForSummerCamp.value}
                              onCheckboxChange={onCheckboxChange} />
                            <WeekPromos weekNum={8}
                              summerCampPerWeekPromos={weekPromos(8)}
                              promoPackage={promoPackage.value}
                              onChange={(val: SummerCampPromoSetting) => {
                                reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                              }}
                              summerCampWeeksForPromo={summerCampWeeks}
                              weeksForSummerCamp={weeksForSummerCamp.value}
                              onCheckboxChange={onCheckboxChange} />
                            <WeekPromos weekNum={9}
                              summerCampPerWeekPromos={weekPromos(9)}
                              promoPackage={promoPackage.value}
                              onChange={(val: SummerCampPromoSetting) => {
                                reduxStore.dispatch(summerCampPromoSet(fieldInputValue(val)));
                              }}
                              summerCampWeeksForPromo={summerCampWeeks}
                              weeksForSummerCamp={weeksForSummerCamp.value}
                              onCheckboxChange={onCheckboxChange} />
                          </div>
                        </div>

                      </div>

                    </div>
                    {
                      promoPackage.errorText !== '' &&
                      (<div className="text-danger">{promoPackage.errorText}</div>)
                    }
                    {
                      weeksForSummerCamp.errorText !== '' &&
                      (<div className="text-danger">{weeksForSummerCamp.errorText}</div>)
                    }
                  </>
                )
            }
          </div>
        )
      }
    </div>
  )
}