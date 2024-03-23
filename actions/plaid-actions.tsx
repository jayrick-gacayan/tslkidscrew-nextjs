'use server';

import { auth } from '@/auth';
import { Result } from '@/models/result';
import { addOrUpdateBankDetails, unlinkBankDetails } from '@/services/plaid-services';
import { ResultStatus } from '@/types/enums/result-status';
import { Session } from 'next-auth';

export async function addOrUpdateBankDetailsAction(
  public_token: string,
  account_id: string
) {
  let parent: Session | null = await auth();
  let urlSearchParams = new URLSearchParams();
  urlSearchParams.set('public_token', public_token);
  urlSearchParams.set('account_id', account_id);

  let result: Result<any> = await addOrUpdateBankDetails(`?${urlSearchParams.toString()}`, parent?.user.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message,
      success: false
    }
  }

  return {
    message: 'Successfully add or update bank details',
    success: true
  }
}

export async function unlinkBankDetailsAction() {
  let parent: Session | null = await auth();

  let result: Result<any> = await unlinkBankDetails(parent?.user.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message ?? result.error,
      success: false,
    };
  }

  return {
    message: 'Successfully unlink bank details.',
    success: true,
  };
}