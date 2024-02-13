import RegistrationInfoHeader from "./_sections/registration-info-header";
import RegistrationInfoTable from "./_sections/registration-info-table";
import { SearchParamsProps } from "@/types/props/search-params-props";
import PaginationClient from "./_sections/pagination-client";
import { redirectURL } from "@/types/common-use-server-functions/use-server-functions";
import { auth } from "@/auth";

// import { Admin } from "@/models/admin";
// import { User } from "next-auth";
// import { Parent } from "@/models/parent";

export default async function Page({
  searchParams
}: {
  searchParams: SearchParamsProps;
}) {
  let data = await auth();


  // let parent = data?.user as (Parent & User);
  // let admin = data?.user as (Admin & User);

  // console.log('parent', parent.address, data?.accessToken);
  // console.log('admin', admin.name, data?.accessToken);

  return (
    <div className="rounded bg-white drop-shadow-lg py-4 px-8 space-y-6">
      <RegistrationInfoHeader />
      <RegistrationInfoTable />
      <PaginationClient searchParams={searchParams} totalPages={5} redirectURL={redirectURL} />
    </div>
  )
}