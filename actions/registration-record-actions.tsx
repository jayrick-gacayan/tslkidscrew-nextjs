'use server';

import { auth } from '@/auth';
import {
  getRegistrationRecord,
  getRegistrationRecords
} from '@/services/registration-record-services';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { Session } from 'next-auth';

export async function getRegistrationRecordAction(reg_id: string) {
  let parent: Session | null = await auth();

  return await getRegistrationRecord(reg_id, parent?.user.accessToken!);
}

export async function getRegistrationRecordsAction(searchParams: SearchParamsProps) {
  let parent: Session | null = await auth();

  return await getRegistrationRecords(searchParams, parent?.user.accessToken!);
}