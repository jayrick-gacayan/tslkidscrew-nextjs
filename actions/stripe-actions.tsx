'use server'

import { auth } from '@/auth';
import { Result } from '@/models/result';
import { addCard, unlinkStripeCard } from '@/services/stripe-services';
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
    message: 'Successfully linked card from your account.',
    success: true,
  };
}

export async function unlinkStripeCardAction() {
  let parent: Session | null = await auth();

  let result: Result<any> = await unlinkStripeCard(parent?.user.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: result.message ?? result.error,
      success: false,
    };
  }

  return {
    message: 'Successfully unlinked card from your account.',
    success: true,
  };
}