import InfoContainer from '@/app/_components/info-container';
import { Admin } from '@/models/admin';

export default async function AdminInfoData({ admin }: { admin: Admin; }) {
  let { updated_at, name, email, is_super_admin, active } = admin;

  return (
    <div className='columns-1 lg:columns-2 space-y-4'>
      <InfoContainer label='Name' data={name ?? 'N/A'} />
      <InfoContainer label='Email' data={email ?? 'N/A'} />
      <InfoContainer label='Active' data={active === undefined || !active ? 'No' : 'Yes'} />
      <InfoContainer label='Super Admin' data={is_super_admin === undefined || !is_super_admin ? 'No' : 'Yes'} />
      <InfoContainer label='Last Signed In'
        data={
          <div className='space-x-2'>
            {new Date(updated_at!).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })} &nbsp;
            {new Date(updated_at!).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </div>
        } />
      <InfoContainer label='Created By' data='N/A' />
    </div>
  )
}