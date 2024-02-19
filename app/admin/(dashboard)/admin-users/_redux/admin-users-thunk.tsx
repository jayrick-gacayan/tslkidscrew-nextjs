import { AppDispatch, reduxStore } from "@/react-redux/redux-store";
import { AdminUsersState } from "./admin-users-state";
import { ResultStatus } from "@/types/enums/result-status";
import { adminUserRequestStatusSet } from "./admin-users-slice";
import { RequestStatus } from "@/types/enums/request-status";
import { ToastContentProps, toast, TypeOptions } from "react-toastify";
import { auth } from '@/auth';
import {
  addAdminUserAction,
  updateAdminUserAction
} from "@/actions/admin-actions";

export async function addUserAdmin(dispatch: AppDispatch, getState: typeof reduxStore.getState) {

  let adminUserState: AdminUsersState = getState().adminUsers;

  let { email, name, isSuperAdmin } = adminUserState.adminUserForm;

  let result = await addAdminUserAction({
    email: email.value,
    name: name.value,
    isSuperAdmin: isSuperAdmin
  });

  if (result.resultStatus !== ResultStatus.SUCCESS) {
    dispatch(adminUserRequestStatusSet(RequestStatus.FAILURE));
    toastResponse(
      'Successfully created an admin user.',
      'create',
      'error'
    );
  }
  else {
    toastResponse(
      'Something went wrong. Please try again.',
      'create',
      'success'
    );
    dispatch(adminUserRequestStatusSet(RequestStatus.SUCCESS));
  }
}

export async function updateUserAdmin(dispatch: AppDispatch, getState: typeof reduxStore.getState) {
  let adminUserState: AdminUsersState = getState().adminUsers;

  let { email, name, isSuperAdmin, isActive } = adminUserState.adminUserForm;

  let result = await updateAdminUserAction({
    email: email.value,
    name: name.value,
    isSuperAdmin,
    isActive
  });


  if (result.resultStatus !== ResultStatus.SUCCESS) {
    dispatch(adminUserRequestStatusSet(RequestStatus.FAILURE));
    toastResponse(
      'Something went wrong. Please try again.',
      'update',
      'error'
    );
  }
  else {
    toastResponse(
      'Successfully updated an admin user.',
      'update',
      'success'
    );
    dispatch(adminUserRequestStatusSet(RequestStatus.SUCCESS));
  }
}

function toastResponse(
  message: string,
  crudType: string,
  errorType: TypeOptions,
) {
  toast((props: ToastContentProps<unknown>) => {
    return (
      <div className="text-black flex gap-2">
        {message}
      </div>
    )
  }, {
    toastId: `admin-user-${crudType}-${Date.now()}`,
    type: errorType,
    hideProgressBar: true,
  })
}
