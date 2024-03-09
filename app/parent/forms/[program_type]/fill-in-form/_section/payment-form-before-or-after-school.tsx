import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { BEFORE_OR_AFTER_SCHOOL_TOS } from "@/types/constants/before-or-after-school-tos";
import { TOSInfos } from "@/types/props/tos-infos";
import { FillInFormState } from "../_redux/fill-in-form-state";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState, reduxStore } from "@/react-redux/redux-store";
import { ChangeEvent, useMemo } from "react";
import { fieldInputValue } from "@/types/helpers/field-input-value";
import { tosConditionChanged } from "../_redux/fill-in-form-slice";

export default function PaymentFormBeforeOrAfterSchool() {
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
        BEFORE_OR_AFTER_SCHOOL_TOS.map(({ num, text }: TOSInfos, idx: number) => {
          return (
            <InputCheckboxCustom key={`before-or-after-school-TOS-${num}`}
              id={`before-or-after-school-TOS-${num}`}
              labelText={text}
              name='before-after-school-tos[]'
              value={`before-or-after-school-TOS-${num}`}
              checked={tosCondition.includes(`before-or-after-school-TOS-${num}`)}
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