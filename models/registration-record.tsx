import { ChildRecord } from "./child-record";

export interface RegistrationRecord {
  id?: number;
  child_records?: ChildRecord[] | null;
  program?: string | null;
  date?: string | null;
  is_active?: boolean | null;
}