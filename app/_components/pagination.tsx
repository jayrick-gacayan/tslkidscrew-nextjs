import { SearchParamsProps } from "@/types/props/search-params-props";
import { Fa6SolidChevronLeft } from "./svg/fa6-solid-chevron-left"
import { Fa6SolidChevronRight } from "./svg/fa6-solid-chevron-right"
import Link from "next/link";
import PaginationIcon from "./pagination-icon";

export default function Pagination({
  baseURL,
  currentPage,
  searchParams,
  totalPages,
  onButtonClick
}: {
  baseURL: string
  currentPage: string | undefined;
  searchParams: SearchParamsProps;
  totalPages: number;
  onButtonClick: (url: string) => void;
}) {

  let pageNumber = !currentPage ? 1 : parseInt(currentPage);

  function urlPaginate(searchParams: SearchParamsProps, pageNumber?: number) {
    let urlSearchParams = new URLSearchParams(Object.entries(searchParams) as string[][])

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
      <div className="w-fit flex items-center rounded border border-primary divide-x divide-primary overflow-hidden">
        <div>
          <PaginationIcon condition={pageNumber === 1}
            onClick={() => {
              onButtonClick(urlPaginate(searchParams, pageNumber - 1 === 1 ? undefined : pageNumber - 1))
            }}
            icon={<Fa6SolidChevronLeft className="inline-block text-primary text-[20px] " />} />
        </div>
        {
          Array.from({ length: totalPages <= 5 ? totalPages : 5 }).map((_val, idx) => {
            return (totalPages <= 5 || pageNumber <= 5) ? idx + 1 :
              pageNumber === totalPages ? (idx + ((totalPages - 5) + 1)) :
                (idx + ((pageNumber - 5) + 1))
          }).map((value: number, index: number) => {
            return (
              <div key={`pagination-${value}-index`}>
                <Link href={urlPaginate(searchParams, value === 1 ? undefined : value)}
                  className={`px-4 py-3 ${value === pageNumber ? 'bg-primary text-white' : 'text-primary'} cursor-pointer inline-block`}>
                  {value}
                </Link>
              </div>
            )
          })
        }
        <div>
          <PaginationIcon condition={pageNumber === totalPages}
            onClick={() => {
              onButtonClick(urlPaginate(searchParams, pageNumber === totalPages ? totalPages : pageNumber + 1))
            }}
            icon={<Fa6SolidChevronRight className="inline-block text-primary text-[20px] " />} />
        </div>
      </div>
    )
}