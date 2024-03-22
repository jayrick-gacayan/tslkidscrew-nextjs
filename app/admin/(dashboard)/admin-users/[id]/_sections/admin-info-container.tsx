import { notFound } from 'next/navigation';
import AdminInfoData from './admin-info-data';
import EditInfoButton from './edit-info-button';
import { adminUserAction } from '@/actions/admin-actions';

export default async function AdminInfoContainer({ id }: { id: string }) {
  let result = await adminUserAction(id);

  if (!result.data) { notFound(); }

  return (
    <div className='bg-secondary p-6'>
      <AdminInfoData admin={result.data} />
      <EditInfoButton admin={result.data} />
    </div>
  );
}