import { auth } from "@/auth";
import { Admin } from "@/models/admin";
import { AppDispatch, reduxStore } from "@/react-redux/redux-store";
import { addAdminUser, updateAdminUser } from "@/services/admin-services";

import { AdminUsersState } from "./admin-users-state";
import { ResultStatus } from "@/types/enums/result-status";
import { adminUserRequestStatusSet } from "./admin-users-slice";
import { RequestStatus } from "@/types/enums/request-status";

export function addUserAdmin(token: string) {
  return async function (dispatch: AppDispatch, getState: typeof reduxStore.getState) {
    let adminUserState: AdminUsersState = getState().adminUsers;

    let { email, name, isSuperAdmin } = adminUserState.adminUserForm;

    let result = await addAdminUser({
      email: email.value,
      name: name.value,
      isSuperAdmin: isSuperAdmin
    }, token);

    if (result.resultStatus !== ResultStatus.SUCCESS) {
      dispatch(adminUserRequestStatusSet(RequestStatus.FAILURE));
    }
    else {
      dispatch(adminUserRequestStatusSet(RequestStatus.SUCCESS));
    }
  }
}

export function updateUserAdmin(token: string) {
  return async function (dispatch: AppDispatch, getState: typeof reduxStore.getState) {
    let adminUserState: AdminUsersState = getState().adminUsers;

    let { email, name, isSuperAdmin, isActive } = adminUserState.adminUserForm;

    let result = await updateAdminUser({
      email: email.value,
      name: name.value,
      isSuperAdmin,
      isActive,
    }, token);

    if (result.resultStatus !== ResultStatus.SUCCESS) {
      dispatch(adminUserRequestStatusSet(RequestStatus.FAILURE));
    }
    else {
      dispatch(adminUserRequestStatusSet(RequestStatus.SUCCESS));
    }
  }
}
