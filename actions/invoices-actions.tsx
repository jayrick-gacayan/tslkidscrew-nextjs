'use server';

import { auth } from '@/auth';
import { getAllCustomerInvoices, getCustomerInvoice } from '@/services/invoice-services';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { Session } from 'next-auth';

export async function getAllCustomerInvoicesAction(searchParams: SearchParamsProps) {
  let parent: Session | null = await auth();

  return await getAllCustomerInvoices(searchParams, parent?.user?.accessToken!);
}

export async function getCustomerInvoiceAction(id: string) {
  let parent: Session | null = await auth();

  return await getCustomerInvoice(id, parent?.user?.accessToken!);
}