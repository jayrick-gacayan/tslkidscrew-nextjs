import SwalConfirmInfo from '@/app/_components/swal-confirm-info';
import { ReactNode } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export async function confirmSwalInfo(text: string, data: any | ReactNode) {
  return await withReactContent(Swal).fire({
    html: (<SwalConfirmInfo text={text} data={data} />),
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    customClass: {
      actions: 'flex gap-2',
      confirmButton: 'bg-primary text-white p-2 rounded',
      cancelButton: 'bg-danger text-white p-2 rounded',
    },
    showCancelButton: true,
    buttonsStyling: false,

  });
}

export async function swalCreateRegRecordMessage(message: string, type: SweetAlertIcon) {
  return await withReactContent(Swal).fire({
    html: (
      <div className="space-y-[4px] text-center font-semibold">
        <div className="text-[20px]">{message}</div>
      </div>
    ),
    allowOutsideClick: false,
    customClass: {
      actions: 'flex gap-2',
      confirmButton: 'bg-primary text-white p-2 rounded w-24',
    },
    showCancelButton: false,
    buttonsStyling: false,
    icon: type
  });
}