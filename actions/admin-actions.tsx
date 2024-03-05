'use server';

import { auth } from '@/auth';
import { Admin } from '@/models/admin';
import { addAdminUser, changeAdminUserActiveStatus, updateAdminUser } from '@/services/admin-services';
import { AdminUserFormStateProps } from '@/types/props/admin-user-form-state-props';
import { Session } from 'next-auth';
import * as Joi from 'joi';
import { ValidationType } from '@/types/enums/validation-type';
import { ResultStatus } from '@/types/enums/result-status';
import { revalidatePath } from 'next/cache';

export async function addAdminUserAction(
  prevState: AdminUserFormStateProps,
  formData: FormData
) {
  let admin: Session<Admin> = await auth();

  let email = formData.get('admin-user-email') as string ?? '';
  let name = formData.get('admin-user-name') as string ?? '';

  let errors = adminUserFormValidate({
    "admin-user-email": email,
    "admin-user-name": name
  });

  if (errors) { return errors; }

  let result = await addAdminUser({
    email,
    name,
    isSuperAdmin: formData.get('admin-user-is-super-admin') ? true : false,
  }, admin?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong. Please try again',
      success: false,
    }
  }

  return {
    message: 'Successfully created an admin',
    success: true,
  };
}

export async function updateAdminUserAction(
  email: string,
  prevState: Partial<AdminUserFormStateProps>,
  formData: FormData,
) {
  let admin: Session<Admin> = await auth();

  formData.set('admin-user-email', email)

  let tempEmail = formData.get('admin-user-email') as string ?? '';
  let name = formData.get('admin-user-name') as string ?? '';

  let errors = adminUserFormValidate({ "admin-user-name": name });

  if (errors) { return errors; }

  let result = await updateAdminUser({
    email: tempEmail,
    name,
    isSuperAdmin: formData.get('admin-user-is-super-admin') ? true : false,
    isActive: formData.get('admin-user-active') ? true : false,
  }, admin?.accessToken!)

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong. Please try again',
      success: false,
    }
  }

  return {
    message: 'Successfully updated an admin user',
    success: true,
  }
}

export async function changeAdminUserActiveStatusAction(id: number) {
  let admin: Session<Admin> | null = await auth();

  let result = await changeAdminUserActiveStatus(id, admin?.accessToken!);
  revalidatePath('/admin/admin-users');
}

const adminUserSchema = Joi.object({
  'admin-user-email': Joi.string()
    .required()
    .email()
    .messages({
      'string.empty': 'Admin user email is required.',
      'any.required': 'Admin user email is required.',
      "string.email": "Email is in invalid format.",
    }),
  'admin-user-name': Joi.string()
    .required()
    .messages({
      'string.empty': 'Admin user name is required.',
      'any.required': 'Admin user name is required.',
    })
})

function adminUserFormValidate(validateData: Partial<{
  'admin-user-email': string;
  'admin-user-name': string;
}>) {
  const validate = adminUserSchema.validate(validateData, { abortEarly: false })

  if (validate?.error) {
    return validate.error?.details.reduce((prev, curr) => {
      return Object.assign({
        [curr.context?.key ?? '']: {
          value: curr.context?.value,
          errorText: curr.message,
          validationStatus: ValidationType.ERROR,
        }
      }, prev)
    }, {}) as Partial<AdminUserFormStateProps>;
  }

  return validate.error;
}