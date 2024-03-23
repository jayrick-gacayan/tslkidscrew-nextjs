import { SearchParamsProps } from '@/types/props/search-params-props';
import Link from 'next/link';
import PaginationIcon from './pagination-icon';

export default function Pagination({
  baseURL,
  currentPage,
  searchParams,
  totalPages,
}: {
  baseURL: string
  currentPage: string | undefined;
  searchParams: SearchParamsProps;
  totalPages: number;
}) {

  let pageNumber: number = !currentPage ? 1 : parseInt(currentPage);

  function urlPaginate(searchParams: SearchParamsProps, pageNumber?: number): string {
    let urlSearchParams: URLSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

    if (!pageNumber) { urlSearchParams.delete('page'); }
    else {
      urlSearchParams.set(
        encodeURIComponent('page'),
        encodeURIComponent(pageNumber)
      );
    }

    return `${baseURL}${urlSearchParams.toString() === '' ? '' : `?${urlSearchParams.toString()}`}`
  }

  return totalPages === 1 ? null :
    (
      <div className='w-fit flex items-center rounded border border-primary divide-x divide-primary overflow-hidden'>
        <div>
          <PaginationIcon condition={pageNumber === 1}
            href={urlPaginate(searchParams, pageNumber - 1 === 1 ? undefined : pageNumber - 1)}
            direction='left' />
        </div>
        {
          Array.from({ length: totalPages <= 5 ? totalPages : 5 }).map((_val, idx) => {
            return (totalPages <= 5 || pageNumber <= 5) ? idx + 1 :
              pageNumber === totalPages ? (idx + ((totalPages - 5) + 1)) :
                (idx + ((pageNumber - 5) + 1));
          }).map((value: number, index: number) => {
            return (
              <div key={`pagination-${value}-index`}>
                <Link href={urlPaginate(searchParams, value === 1 ? undefined : value)}
                  replace={true}
                  className={`px-3 py-2 cursor-pointer inline-block hover:bg-secondary-light
                    ${value === pageNumber ? 'bg-primary text-white' : 'text-primary'}`}>
                  {value}
                </Link>
              </div>
            );
          })
        }
        <div>
          <PaginationIcon condition={pageNumber === totalPages}
            href={urlPaginate(searchParams, pageNumber === totalPages ? undefined : pageNumber + 1)}
            direction='right' />
        </div>
      </div>
    )
}