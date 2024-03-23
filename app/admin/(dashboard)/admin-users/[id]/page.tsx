import BackButtonClient from '@/app/_components/back-button-client';
import AdminHeaderWithEntries from '../../_components/admin-header-with-entries';
import AdminInfoContainer from './_sections/admin-info-container';

export default function Page({ params }: { params: { id: string } }) {

  return (
    <div className='p-8 space-y-4'>
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Admin Information' />
      <AdminInfoContainer id={params.id} />
    </div>
  );
}