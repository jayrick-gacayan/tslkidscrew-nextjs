import { Admin } from "@/models/admin";
import { Parent } from "@/models/parent";

export function isAdmin(data: any): data is Admin {
  return (
    typeof data === 'object' && 'is_super_admin' in data
  );
}

export function isParent(data: any): data is Parent {
  return (
    typeof data === 'object' && 'address' in data
  );
}