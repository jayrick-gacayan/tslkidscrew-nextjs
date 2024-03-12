import SwalConfirmInfo from '@/app/_components/swal-confirm-info';
import { ReactNode } from 'react';
import Swal from 'sweetalert2';
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