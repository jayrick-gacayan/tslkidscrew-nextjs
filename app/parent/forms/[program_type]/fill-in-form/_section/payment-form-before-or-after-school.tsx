import InputCheckboxCustom from "@/app/_components/input-checkbox-custom";
import { BEFORE_OR_AFTER_SCHOOL_TOS } from "@/types/constants/before-or-after-school-tos";
import { TOSInfos } from "@/types/props/tos-infos";

export default function PaymentFormBeforeOrAfterSchool() {


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
            />
          )
        })
      }
    </div>
  )
}