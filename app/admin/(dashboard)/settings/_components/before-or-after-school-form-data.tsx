import { pathRevalidate } from "@/actions/common-actions";
import { updateBeforeOrAfterSchoolSettingAction } from "@/actions/program-settings-actions";
import InputCustom from "@/app/_components/input-custom";
import Fa6SolidSquareCheck from "@/app/_components/svg/fa6-solid-square-check";
import Spinners3DotsScale from "@/app/_components/svg/spinners3-dots-scale";
import { BeforeOrAfterSchoolSetting } from "@/models/before-or-after-school-setting";
import { currencyFormat } from "@/types/helpers/currency-format";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast, ToastContentProps } from "react-toastify";
import { useOnClickOutside } from "usehooks-ts";

function ButtonSubmit() {
  const { pending } = useFormStatus();

  return (
    <button type="submit"
      disabled={pending}
      className="cursor-pointer disabled:cursor-not-allowed flex-none w-auto">
      {
        pending ? <Spinners3DotsScale className="text-success text-[32px]" /> : <Fa6SolidSquareCheck className="text-success text-[32px]" />
      }

    </button>
  )
}
export default function BeforeOrAfterSchoolFormData({
  setCurrentId,
  currentId,
  beforeOrAfterSchoolSetting,
}: {
  setCurrentId: Dispatch<SetStateAction<number>>
  currentId: number | undefined;
  beforeOrAfterSchoolSetting: BeforeOrAfterSchoolSetting;
}) {
  const ref = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(updateBeforeOrAfterSchoolSettingAction, {} as any);

  useEffect(() => {
    async function pathToRevalidate() {
      await pathRevalidate('/admin/settings')
    }
    let { message, success } = state;
    if (success !== undefined) {
      console.log('dfdsaf I am here')
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className="text-black">{message}</div>
        )
      }, {
        toastId: `update-summer-camp-swim-setting-${Date.now()}`,
        type: success ? 'success' : 'error',
        hideProgressBar: true,
      })
      pathToRevalidate();
      setCurrentId(-1)
    }
  }, [
    state,
    setCurrentId,
  ])


  return (
    <td className="w-auto">
      <div className="px-2 py-3 w-full">
        <div className="w-full">
          <span className={`${currentId !== beforeOrAfterSchoolSetting?.id ? 'block' : 'hidden'} w-full border border-secondary-light p-3 bg-white rounded text-center`}
            onClick={() => { setCurrentId(beforeOrAfterSchoolSetting?.id ?? 1); }}>
            {currencyFormat('en-US', { style: "currency", currency: 'USD', }, beforeOrAfterSchoolSetting?.price ?? 0)}

          </span>
          <form ref={ref}
            action={formAction}
            className={`flex min-w-fit w-full gap-1 ${currentId !== beforeOrAfterSchoolSetting?.id ? 'hidden' : ''}`}>
            <input type='hidden' className='hidden'
              name={`master_prices[${beforeOrAfterSchoolSetting?.id}][id]`}
              value={beforeOrAfterSchoolSetting?.id ?? 1} />
            <div className="flex-1">
              <InputCustom
                type="text"
                id={`before-or-after-school-setting-before-${beforeOrAfterSchoolSetting?.id!}`}
                inputMode="numeric"
                name={`master_prices[${beforeOrAfterSchoolSetting?.id}][price]`}
                defaultValue={beforeOrAfterSchoolSetting?.price?.toString() ?? ''}
                className=" bg-white text-center" />
            </div>
            <ButtonSubmit />

          </form>
        </div>
      </div>
    </td>
  )
}
