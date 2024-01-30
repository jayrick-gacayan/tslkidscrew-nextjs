import { Dispatch, SetStateAction } from "react";

export type AdminUserProps = {
  email?: string;
  name?: string;
  isSuperAdmin: boolean;
  isActive: boolean;
  crud: string;
  id?: number;
}
