'use server';

import { auth } from '@/auth';
import {
  activeAdminUsers,
  addAdminUser,
  adminUser,
  adminUsers,
  updateAdminUser
} from '@/services/admin-services';
import { AdminUserFormStateProps } from '@/types/props/admin-user-form-state-props';
import { Session, User } from 'next-auth';
import * as Joi from 'joi';
import { ValidationType } from '@/types/enums/validation-type';
import { ResultStatus } from '@/types/enums/result-status';
import { revalidateTag } from 'next/cache';
import { SearchParamsProps } from '@/types/props/search-params-props';
import { Result } from '@/models/result';
import { Admin } from '@/models/admin';

export async function adminUsersAction(searchParams: SearchParamsProps) {
  let admin: Session | null = await auth();

  return await adminUsers(searchParams, admin?.user?.accessToken!);
}

export async function adminUserAction(id: string) {
  let admin: Session | null = await auth();

  return await adminUser(id, admin?.user?.accessToken!);
}

export async function activeAdminUsersAction() {
  let admin: Session | null = await auth();
  let result: Result<Admin[]> = await activeAdminUsers(admin?.user?.accessToken!);

  return result.data?.map((admin: Admin) => {
    let { id, email } = admin;
    return { id, email }
  }) ?? [] as Pick<Admin, 'id' | 'email'>[];
}

export async function addAdminUserAction(
  prevState: AdminUserFormStateProps,
  formData: FormData
) {
  let admin: Session | null = await auth();

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
  }, admin?.user?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong. Please try again',
      success: false,
    };
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
  let admin: Session | null = await auth();

  formData.set('admin-user-email', email);

  let tempEmail = formData.get('admin-user-email') as string ?? '';
  let name = formData.get('admin-user-name') as string ?? '';

  let errors = adminUserFormValidate({
    'admin-user-email': tempEmail,
    'admin-user-name': name
  });

  if (errors) { return errors; }

  let result = await updateAdminUser({
    email: tempEmail,
    name,
    isSuperAdmin: formData.get('admin-user-is-super-admin') ? true : false,
    isActive: formData.get('admin-user-active') ? true : false,
  }, admin?.user?.accessToken!);

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    return {
      message: 'Something went wrong. Please try again',
      success: false,
    };
  }

  return {
    message: 'Successfully updated an admin user',
    success: true,
  };
}

export async function changeAdminUserActiveStatusAction(changeAdmin: Admin) {
  let admin: Session | null = await auth();

  let result = await updateAdminUser({
    email: changeAdmin.email ?? '',
    name: changeAdmin.name ?? '',
    isSuperAdmin: changeAdmin.is_super_admin ?? false,
    isActive: !changeAdmin.active ?? false
  }, admin?.user.accessToken!);

  revalidateTag('admin-users');
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
});

function adminUserFormValidate(validateData: {
  'admin-user-email': string;
  'admin-user-name': string;
}) {
  const validate = adminUserSchema.validate(validateData, { abortEarly: false });

  if (validate?.error) {
    return validate.error?.details.reduce((prev, curr, index) => {
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

export async function currentAdminAction() {
  let admin: Session | null = await auth();

  if (!!admin) {
    let { accessToken, ...rest } = admin.user as User<Partial<Admin>>;

    return { user: rest };
  }

  return undefined;
}