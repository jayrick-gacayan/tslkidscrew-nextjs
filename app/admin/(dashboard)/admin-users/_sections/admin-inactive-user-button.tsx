'use client';

import Fa6UserXmark from "@/app/_components/svg/fa6-user-xmark";
import { Admin } from "@/models/admin";
import { useEffect, useRef, useState } from "react";
import { ToastContentProps, ToastItem, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AdminUserInactiveButton({
  admin
}: {
  admin: Admin;
}) {
  const [toastStatus, setToastStatus] = useState('none');
  const [toastId, setToastId] = useState<any>(null);



  const showSwal = async () => {
    withReactContent(Swal).fire({
      html: (
        <div className="space-y-[4px] text-center font-semibold">
          <div className="text-[20px]">Are you sure you want to inactive</div>
          <div className="text-[28px]">{admin.name ?? admin.email}?</div>
        </div>
      ),
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      customClass: {
        actions: 'flex gap-2',
        confirmButton: 'bg-primary text-white p-2 rounded',
        cancelButton: 'bg-danger text-white p-2 rounded',

      },
      showCancelButton: true,
      buttonsStyling: false,

    }).then((result) => {
      console.log('result', result)
      if (result.isConfirmed) {
        setToastId(admin.id)
        toast((props: ToastContentProps<Admin>) => {
          return (
            <div className="text-black flex gap-2">
              <div className="flex-1">{props.data.name ?? props.data.email} has been inactived from the admin list.</div>
              <div className="underline text-primary"
                onClick={() => {
                  setToastId(null);
                  props.closeToast();
                }}>
                Undo
              </div>
            </div>
          )
        }, {
          data: admin,
          toastId: `admin-${admin.id}`,
          type: 'success',
          hideProgressBar: true,
          onClose: (props) => {
            console.log('close props', props)
          },
          onOpen: (props) => {
            console.log('open props', props)
          }
        })



      }
    });
  }

  return (
    <button onClick={showSwal} className="text-danger cursor-pointer">
      <Fa6UserXmark className="inline-block" />
    </button>
  )
}