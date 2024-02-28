'use client';

import Fa6SolidEye from "@/app/_components/svg/fa6-solid-eye";
import { Admin } from "@/models/admin";
import Link from "next/link";
import { useEffect, useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ToastContentProps, toast } from "react-toastify";
import Fa6UserXmark from "@/app/_components/svg/fa6-solid-user-xmark";
import { inactiveAdminUser } from "../_actions/admin-user-actions";
import { Fa6SolidPen } from "@/app/_components/svg/fa6-solid-pen";
import { reduxStore } from "@/react-redux/redux-store";
import {
  editAdminUserFields,
  modalFormOpenStateSet,
  modalFormTypeSet
} from "../_redux/admin-users-slice";
import Fa6SolidUserCheck from "@/app/_components/svg/fa6-solid-user-check";
import { useAdminUserHook } from "../_contexts/use-admin-user-hook";

export default function AdminUsersTableClient({ admins }: { admins: Admin[] }) {
  const { modalOpen, modalType, setDumpData } = useAdminUserHook();
  const [dataAdmins, setDataAdmins] = useState(admins);
  const [adminId, setAdminId] = useState<any>(undefined);
  const [toastStatus, setToastStatus] = useState('none');

  useEffect(() => {
    switch (toastStatus) {
      case 'closed':
        if (adminId) {
          async function userAdminInactive() {
            await inactiveAdminUser(adminId);
          }
          userAdminInactive();
          setAdminId(undefined);
        }

        setToastStatus('none');
        break;
    }
  }, [toastStatus, adminId]);

  useEffect(() => {
    setDataAdmins(admins);
  }, [admins])

  const showSwal = (admin: Admin, activeAdmin: string) => {
    let { id, name, email, active } = admin
    withReactContent(Swal).fire({
      html: (
        <div className="space-y-[4px] text-center font-semibold">
          <div className="text-[20px]">Are you sure you want to {activeAdmin === 'No' ? 'in' : ''}active</div>
          <div className="text-[28px]">{name ?? email}?</div>
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
      if (result.isConfirmed) {
        setDataAdmins(dataAdmins.map((dataAdmin: Admin) => {
          return dataAdmin.id !== id ? dataAdmin : { ...admin, active: !active }
        }));
        setAdminId(admin.id)
        toast((props: ToastContentProps<Admin>) => {
          return (
            <div className="text-black flex gap-2">
              <div className="flex-1">{props.data.name ?? props.data.email} has been {activeAdmin === 'No' ? 'in' : ''}active from the admin list.</div>
              <div className="underline text-primary"
                onClick={() => {
                  setDataAdmins(dataAdmins.map((dataAdmin: Admin) => {
                    return dataAdmin.id === id ? admin : dataAdmin
                  }));
                  setAdminId(undefined);
                  props.closeToast();
                }}>
                Undo
              </div>
            </div>
          )
        }, {
          data: admin,
          toastId: `admin-${id}`,
          type: 'success',
          hideProgressBar: true,
          onClose: (props) => { setToastStatus('closed') },
          onOpen: (props) => { setToastStatus('opened') }
        })
      }
    });
  }

  return (
    <tbody>
      {
        dataAdmins.map((admin: Admin, idx: number) => {
          let { id, name, active, created_at, email, is_super_admin, updated_at, } = admin;
          let adminActive = (active === undefined || !active) ? 'No' : 'Yes'

          let ActiveIcon = adminActive === 'Yes' ? Fa6UserXmark : Fa6SolidUserCheck;

          return (
            <tr key={`admin-users-table-${name!}-${idx}`}
              className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
              <td className="w-56">{email}</td>
              <td className="w-auto">{name}</td>
              <td className="w-12">{adminActive}</td>
              <td className="w-48"> {(is_super_admin === undefined || !is_super_admin) ? 'No' : 'Yes'}</td>
              <td className="w-48">
                {
                  new Date(created_at!)
                    .toLocaleDateString(
                      'en-US',
                      {
                        month: 'short',
                        day: 'numeric',
                        year: "numeric"
                      }
                    )
                }
              </td>
              <td className="w-48 space-y-1">
                <div>
                  {
                    new Date(updated_at!)
                      .toLocaleDateString(
                        'en-US',
                        {
                          month: '2-digit',
                          day: "2-digit",
                          year: "numeric"
                        }
                      )
                  }
                </div>
                <div>
                  {
                    new Date(updated_at!)
                      .toLocaleString(
                        'en-US',
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        }
                      )
                  }
                </div>
              </td>
              <td className="w-32">
                <div className="flex items-center justify-center w-full gap-2 relative">
                  <Link href={`/admin/admin-users/${id!}`}
                    className="text-primary block cursor-pointer">
                    <Fa6SolidEye />
                  </Link>
                  <button onClick={() => { showSwal(admin, adminActive); }}
                    className={`${adminActive === 'No' ? 'text-success' : 'text-danger'} 
                    cursor-pointer disabled:cursor-not-allowed`}
                    disabled={toastStatus === 'opened' || toastStatus === 'closed'}>
                    <ActiveIcon className="inline-block" />
                  </button>
                  {
                    id! !== 1 &&
                    (
                      <button className="text-warning block cursor-pointer"
                        onClick={() => {
                          modalOpen(true);
                          modalType('update');
                          setDumpData(admin);
                        }}>
                        <Fa6SolidPen />
                      </button>
                    )
                  }
                </div>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  )
}