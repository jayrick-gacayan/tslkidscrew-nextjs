import LocationInfoData from './_sections/location-info-data';
import BackButtonClient from '@/app/_components/back-button-client';
import AdminHeaderWithEntries from '../../_components/admin-header-with-entries';

export default function Page({ params }: { params: { id: string; } }) {

  return (
    <div className='p-8 space-y-4'>
      <BackButtonClient />
      <AdminHeaderWithEntries headerText='Location Information' />
      <LocationInfoData id={params.id} />
    </div>
  );
}