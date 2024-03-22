import type { Metadata } from 'next';
import SearchContainer from './sections/search-container';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard Page'
}

export default function Page() {

  return (
    <div className='rounded h-full bg-white drop-shadow-lg py-4 px-8 lg:px-4 overflow-auto'>
      <SearchContainer />
    </div>
  );
}