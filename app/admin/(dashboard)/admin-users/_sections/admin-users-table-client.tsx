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
import { editAdminUserFields, modalFormOpenStateSet, modalFormTypeSet } from "../_redux/admin-users-slice";

export default function AdminUsersTableClient({ admins }: { admins: Admin[] }) {
  const [dataAdmins, setDataAdmins] = useState(admins);
  const [adminId, setAdminId] = useState<any>(undefined);
  const [toastStatus, setToastStatus] = useState('none');

  useEffect(() => {
    if (toastStatus === 'closed') {
      if (adminId) {
        async function userAdminInactive() {
          await inactiveAdminUser(adminId);
        }
        userAdminInactive();
      }
      setToastStatus('none');
      setAdminId(undefined);
    }
  }, [toastStatus, adminId]);

  const showSwal = (admin: Admin) => {
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
      if (result.isConfirmed) {
        setAdminId(admin.id)
        toast((props: ToastContentProps<Admin>) => {
          return (
            <div className="text-black flex gap-2">
              <div className="flex-1">{props.data.name ?? props.data.email} has been inactived from the admin list.</div>
              <div className="underline text-primary"
                onClick={() => {
                  setAdminId(null);
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
            setToastStatus('closed')
            // console.log('close props', props)
          },
          onOpen: (props) => {
            setToastStatus('opened')
            // console.log('open props', props)
          }
        })
      }
    });
  }

  return (
    <tbody>
      {
        admins.map((admin: Admin, idx: number) => {
          return (
            <tr key={`admin-users-table-${admin.name!}-${idx}`}
              className="bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center">
              <td className="w-56">{admin.email}</td>
              <td className="w-auto">{admin.name}</td>
              <td className="w-12">
                {
                  admin.active === undefined ? 'No' :
                    admin.active ? 'Yes' : 'No'
                }
              </td>
              <td className="w-48">
                {
                  admin.is_super_admin === undefined ? 'No' :
                    admin.is_super_admin ? 'Yes' : 'No'
                }
              </td>
              <td className="w-48">{new Date(admin.created_at!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: "numeric" })}</td>
              <td className="w-48 space-y-1">
                <div>
                  {
                    new Date(admin.updated_at!)
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
                    new Date(admin.updated_at!)
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
                  <Link href={`/admin/admin-users/${admin.id!}`}
                    className="text-primary block cursor-pointer">
                    <Fa6SolidEye />
                  </Link>
                  <button onClick={() => { showSwal(admin); }}
                    className="text-danger cursor-pointer disabled:cursor-not-allowed"
                    disabled={toastStatus === 'opened' || toastStatus === 'closed'}>
                    <Fa6UserXmark className="inline-block" />
                  </button>
                  {
                    admin.id! !== 1 &&
                    (
                      <button className="text-warning block cursor-pointer"
                        onClick={() => {
                          reduxStore.dispatch(editAdminUserFields({
                            email: admin.email!,
                            name: admin.name!,
                            isActive: admin.active!,
                            isSuperAdmin: admin.is_super_admin!,
                            id: admin.id!
                          }))
                          reduxStore.dispatch(modalFormOpenStateSet(true));
                          reduxStore.dispatch(modalFormTypeSet('update'));

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