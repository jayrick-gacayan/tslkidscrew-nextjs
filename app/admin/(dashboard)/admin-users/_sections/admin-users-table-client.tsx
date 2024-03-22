'use client';

import Fa6SolidEye from '@/app/_components/svg/fa6-solid-eye';
import { Admin } from '@/models/admin';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SweetAlertResult } from 'sweetalert2';
import { ToastContentProps, toast } from 'react-toastify';
import { Fa6SolidPen } from '@/app/_components/svg/fa6-solid-pen';
import { dateString, dateTimeString } from '@/types/helpers/date-helpers';
import { changeAdminUserActiveStatusAction } from '@/actions/admin-actions';
import { confirmSwalInfo } from '@/types/helpers/sweet-alert-helpers';
import { reduxStore } from '@/react-redux/redux-store';
import {
  editAdminUserFields,
  modalFormOpened,
  modalFormTypeSet
} from '../_redux/admin-users-slice';
import PopoverChangeActiveStatus from '../_components/popper-change-active-status';

export default function AdminUsersTableClient({ admins }: { admins: Admin[] }) {
  const [dataAdmins, setDataAdmins] = useState(admins);
  const [adminId, setAdminId] = useState<any>(undefined);
  const [toastStatus, setToastStatus] = useState('none');

  useEffect(() => {
    switch (toastStatus) {
      case 'closed':
        if (adminId) {
          async function changeAdminActiveStatus() {
            await changeAdminUserActiveStatusAction(adminId);
          }
          changeAdminActiveStatus();
          setAdminId(undefined);
        }

        setToastStatus('none');
        break;
    }
  }, [toastStatus, adminId]);

  useEffect(() => {
    setDataAdmins(admins);
  }, [admins]);

  async function showSwal(admin: Admin, activeAdmin: string) {
    let { id, name, email, active } = admin;

    let result: SweetAlertResult<any> = await confirmSwalInfo(
      `Are you sure you want to ${activeAdmin === 'Yes' ? 'de' : ''}activate`,
      name! ?? email!
    );

    if (result.isConfirmed) {
      setDataAdmins(dataAdmins.map((dataAdmin: Admin) => {
        return dataAdmin.id !== id ? dataAdmin : { ...admin, active: !active };
      }));
      setAdminId(admin.id);

      toast((props: ToastContentProps<Admin>) => {
        return (
          <div className='text-black flex gap-2'>
            <div className='flex-1'>{props.data.name ?? props.data.email} has been {activeAdmin === 'Yes' ? 'de' : ''}activated from the admin list.</div>
            <div className='underline text-primary'
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
        );
      }, {
        data: admin,
        toastId: `admin-${id}`,
        type: 'success',
        hideProgressBar: true,
        onClose: (props) => { setToastStatus('closed'); },
        onOpen: (props) => { setToastStatus('opened'); }
      });
    }
  };

  return (
    <tbody className='text-[15px]'>
      {
        dataAdmins.map(
          (admin: Admin, idx: number) => {
            let { id, name, active, email, is_super_admin, updated_at, } = admin;
            let adminActive: 'Yes' | 'No' = (active === undefined || !active) ? 'No' : 'Yes'

            return (
              <tr key={`admin-users-table-${name!}-${idx}`}
                className='bg-secondary [&>td]:px-3 [&>td]:py-2 [&>td]:text-center'>
                <td className='w-56'>{email}</td>
                <td className='w-auto'>{name}</td>
                <td className='w-12'>
                  <PopoverChangeActiveStatus activeAdmin={adminActive}
                    onClick={async () => { await showSwal(admin, adminActive); }} />
                </td>
                <td className='w-12'> {(is_super_admin === undefined || !is_super_admin) ? 'No' : 'Yes'}</td>
                <td className='w-48'>{dateString(updated_at!, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td className='w-40 space-y-1'>
                  <div>{dateString(updated_at!, { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
                  <div>{dateTimeString(updated_at!, { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                </td>
                <td className='w-32'>
                  <div className='flex items-center justify-center w-full gap-2 relative'>
                    <Link href={`/admin/admin-users/${id!}`}
                      className='text-primary block cursor-pointer'>
                      <Fa6SolidEye />
                    </Link>
                    {
                      id! !== 1 &&
                      (
                        <button className='text-warning block cursor-pointer'
                          onClick={() => {
                            let { name, email, id, is_super_admin, active } = admin;
                            reduxStore.dispatch(modalFormOpened(true));
                            reduxStore.dispatch(modalFormTypeSet('update'));
                            reduxStore.dispatch(editAdminUserFields({ email, name, id, is_super_admin, active }));
                          }}>
                          <Fa6SolidPen />
                        </button>
                      )
                    }
                  </div>
                </td>
              </tr>
            );
          }
        )
      }
    </tbody>
  );
}