'use server';

import { auth } from '@/auth';
import {
  getRegistrationRecord,
  getRegistrationRecords
} from '@/services/registration-record-services';
import { Session } from 'next-auth';

export async function getRegistrationRecordAction(reg_id: string) {
  let parent: Session | null = await auth();

  return await getRegistrationRecord(reg_id, parent?.user.accessToken!);
}

export async function getRegistrationRecordsAction() {
  let parent: Session | null = await auth();

  return await getRegistrationRecords(parent?.user.accessToken!);
}