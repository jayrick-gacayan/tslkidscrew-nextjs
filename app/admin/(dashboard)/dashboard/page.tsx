import type { Metadata } from "next";
import SearchContainer from "./sections/search-container";

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard Page'
}

export default function Page() {
  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 lg:px-4">
      <SearchContainer />
    </div>
  )
}