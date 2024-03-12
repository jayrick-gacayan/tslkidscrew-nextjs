'use server'

import { auth } from '@/auth';
import { addCard } from '@/services/stripe-services';
import { ResultStatus } from '@/types/enums/result-status';
import { Session } from 'next-auth';

export async function addCardAction(stripeToken: string) {
  let parent: Session | null = await auth();

  let result = await addCard({
    stripeToken: stripeToken,
    stripeEmail: parent?.user?.email!
  }, parent?.user?.accessToken!);

  if (result?.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result?.message ?? result?.error,
      error: result?.error,
      success: false,
    };
  }

  return {
    message: result?.message,
    success: true,
  };
}