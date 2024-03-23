import type { Metadata } from 'next';
import SearchContainer from './sections/search-container';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard Page'
}

export default function Page() {

  return (
    <div className='p-8'>
      <SearchContainer />
    </div>
  );
}