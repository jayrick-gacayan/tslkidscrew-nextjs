'use server';

import { auth } from '@/auth';
import { getAllCustomerReceipts } from '@/services/receipt-services';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { Session } from 'next-auth';

export async function getAllCustomerReceiptsAction(searchParams: SearchParamsProps) {
  let parent: Session | null = await auth();

  return await getAllCustomerReceipts(searchParams, parent?.user?.accessToken!);
}