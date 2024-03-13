import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { TOSInfos } from "@/types/props/tos-infos";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { ChangeEvent, useMemo } from "react";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { tosConditionChanged } from "../_redux/fill-in-form-slice";
import { SUMMER_CAMP_SCHOOL_TOS } from "@/types/constants/summer-camp-tos";

export default function PaymentFormSummerCamp() {
  const fillInFormState: FillInFormState = useAppSelector((state: RootState) => {
    return state.fillInForm
  });

  const tosCondition = useMemo(() => {
    let { value } = fillInFormState.fillInForm.TOSCondition;

    return value
  }, [fillInFormState.fillInForm.TOSCondition])

  return (
    <div className="space-y-2">
      {
        SUMMER_CAMP_SCHOOL_TOS.map(({ num, text }: TOSInfos, idx: number) => {
          return (
            <InputCheckboxCustom key={`summer-camp-TOS-${num}`}
              id={`summer-camp-TOS-${num}`}
              labelText={text}
              name='summer-camp-tos[]'
              value={`summer-camp-TOS-${num}`}
              checked={tosCondition.includes(`summer-camp-TOS-${num}`)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                let { value } = e.target;
                reduxStore.dispatch(
                  tosConditionChanged(
                    fieldInputValue(
                      !tosCondition.includes(value) ? [...tosCondition, value] :
                        tosCondition.filter((val: any) => { return val !== value; })
                    )
                  )
                )
              }}
            />
          )
        })
      }
    </div>
  )
}
