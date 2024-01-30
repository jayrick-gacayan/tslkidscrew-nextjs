import { RequestStatus } from "@/types/enums/request-status";
import { InputProps } from "@/types/props/input-props";
export interface AdminUsersState {
  modalForm: {
    type: string;
    open: boolean;
  }

  adminUserForm: {
    email: InputProps<string>;
    name: InputProps<string>;
    isActive: boolean;
    isSuperAdmin: boolean;
    requestStatus: RequestStatus;
    id?: number
  }
}