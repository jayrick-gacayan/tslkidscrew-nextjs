import SwalConfirmInfo from "@/app/_components/swal-confirm-info";
import { ReactNode } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export async function confirmSwalInfo(data: any | ReactNode, text: string) {
  return await withReactContent(Swal).fire({
    html: (<SwalConfirmInfo text="Are you sure you want to delete" data={data} />),
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    customClass: {
      actions: 'flex gap-2',
      confirmButton: 'bg-primary text-white p-2 rounded',
      cancelButton: 'bg-danger text-white p-2 rounded',
    },
    showCancelButton: true,
    buttonsStyling: false,
  })
}