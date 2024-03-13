import { pathRevalidate } from '@/actions/common-actions';
import { updateBeforeOrAfterSchoolSettingAction } from '@/actions/program-settings-actions';
import InputCustom from '@/app/_components/input-custom';
import { BeforeOrAfterSchoolSetting } from '@/models/before-or-after-school-setting';
import { currencyFormat } from '@/types/helpers/currency-format';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast, ToastContentProps } from 'react-toastify';
import BeforeOrAfterSchoolButtonSubmit from './before-or-after-school-button-submit';
import { useOnClickOutside } from 'usehooks-ts';

export default function BeforeOrAfterSchoolFormData({
  setCurrentId,
  currentId,
  beforeOrAfterSchoolSetting,
}: {
  setCurrentId: Dispatch<SetStateAction<number>>
  currentId: number | undefined;
  beforeOrAfterSchoolSetting: BeforeOrAfterSchoolSetting;
}) {
  const [price, setPrice] = useState(beforeOrAfterSchoolSetting?.price?.toString() ?? '')
  const formRef = useRef<HTMLFormElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [state, formAction] = useFormState(updateBeforeOrAfterSchoolSettingAction, {} as any);

  useEffect(() => {
    async function pathToRevalidate() {
      await pathRevalidate('/admin/settings')
    }
    let { message, success } = state;
    if (success !== undefined) {
      toast((props: ToastContentProps<unknown>) => {
        return (
          <div className='text-black'>{message}</div>
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
  ]);

  useEffect(() => {
    setPrice(beforeOrAfterSchoolSetting?.price?.toString() ?? '');
  }, [beforeOrAfterSchoolSetting])


  function handlePriceInputChange(event: ChangeEvent<HTMLInputElement>) {
    setPrice(event.target.value);
  }

  function priceSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formRef.current) {

      let formData = new FormData(formRef.current);

      formAction(formData);
    }
  }

  useOnClickOutside(divRef, () => {
    if (currentId === beforeOrAfterSchoolSetting.id) {
      setCurrentId(-1);
    }
  })

  return (
    <td className='w-auto'>
      <div ref={divRef} className='px-2 py-3 w-full'>
        <div className='w-full'>
          <span className={`${currentId !== beforeOrAfterSchoolSetting?.id ? 'block' : 'hidden'} w-full border border-secondary-light p-3 bg-white rounded text-center`}
            onClick={() => { setCurrentId(beforeOrAfterSchoolSetting?.id ?? 1); }}>
            {currencyFormat('en-US', { style: 'currency', currency: 'USD', }, beforeOrAfterSchoolSetting?.price ?? 0)}
          </span>
          <form ref={formRef}

            className={`flex min-w-fit w-full gap-1 ${currentId !== beforeOrAfterSchoolSetting?.id ? 'hidden' : ''}`}
            onSubmit={priceSubmitForm}>
            <input type='hidden' className='hidden'
              name={`master_prices[${beforeOrAfterSchoolSetting?.id}][id]`}
              value={beforeOrAfterSchoolSetting?.id ?? 1} />
            <div className='flex-1'>
              <InputCustom
                type='text'
                id={`before-or-after-school-setting-before-${beforeOrAfterSchoolSetting?.id!}`}
                inputMode='numeric'
                name={`master_prices[${beforeOrAfterSchoolSetting?.id}][price]`}
                value={price}
                onChange={handlePriceInputChange}
                className=' bg-white text-center' />
            </div>
            <BeforeOrAfterSchoolButtonSubmit />
          </form>
        </div>
      </div>
    </td>
  )
}
