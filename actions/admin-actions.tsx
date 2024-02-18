'use server';

import { auth } from '@/auth';
import { Admin } from '@/models/admin';
import { Result } from '@/models/result';
import { addAdminUser, updateAdminUser } from '@/services/admin-services';
import { AdminUserInputs } from '@/types/input-types/admin-input-types';
import { Session } from 'next-auth';

export async function addAdminUserAction({
  email,
  name,
  isSuperAdmin
}: AdminUserInputs) {
  let admin: Session<Admin> = await auth();

  let result: Response = await addAdminUser({
    email,
    name,
    isSuperAdmin
  }, admin?.accessToken!);

  let response = await result.json();

  let resultClass = new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  });

  return resultClass.getResponseData;
}

export async function updateAdminUserAction({
  email,
  name,
  isActive,
  isSuperAdmin
}: AdminUserInputs) {
  let admin: Session<Admin> = await auth();

  let result: Response = await updateAdminUser({
    email,
    name,
    isActive,
    isSuperAdmin
  }, admin?.accessToken!);

  let response = await result.json();

  let resultClass = new Result<Admin>({
    ...response,
    data: response.data ?? undefined,
    statusCode: result.status,
    response: response
  });

  return resultClass.getResponseData;
}