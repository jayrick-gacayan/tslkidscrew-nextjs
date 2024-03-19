'use server';

import { auth } from '@/auth';
import { getRegistrationRecord } from '@/services/registration-record-services';
import { Session } from 'next-auth';

export async function getRegistrationRecordAction(reg_id: string) {
  let parent: Session | null = await auth();

  let result = await getRegistrationRecord(reg_id, parent?.user.accessToken!);

  return result.data ?? undefined;
}