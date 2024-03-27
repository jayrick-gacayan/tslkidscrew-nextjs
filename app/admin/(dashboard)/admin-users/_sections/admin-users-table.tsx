import { Admin } from '@/models/admin';
import AdminUsersTableClient from './admin-users-table-client';
import SomethingWentWrongClient from '@/app/_components/table-something-went-wrong-client';
import TableEmptyData from '@/app/_components/table-empty-data';

export default function AdminUsersTable({ admins }: { admins: Admin[] | undefined }) {

  return (
    <div className='block overflow-auto rounded bg-secondary min-h-[512px] h-full'>
      <table className={`min-w-[1024px] w-full
        ${!admins || admins.length === 0 || admins.length > 10 ? 'h-full min-h-[512px]' : 'h-auto'}`}>
        <thead className='text-[14px]'>
          <tr className='bg-secondary-light [&>th]:font-medium [&>th]:px-3 [&>th]:py-2 [&>th]:text-black'>
            <th className='w-56'>EMAIL</th>
            <th className='w-auto'>NAME</th>
            <th className='w-12'>ACTIVE</th>
            <th className='w-12'>SUPER ADMIN</th>
            <th className='w-48'>CREATED AT</th>
            <th className='w-40'>LAST SIGNED IN</th>
            <th className='w-32'>ACTION</th>
          </tr>
        </thead>
        {
          !admins ? (<SomethingWentWrongClient />) :
            admins.length === 0 ? (<TableEmptyData colSpan={7} />) :
              (<AdminUsersTableClient admins={admins} />)
        }
      </table>
    </div>
  );
}