import { ChildRecord } from "./child-record";

export interface RegistrationRecord {
  id?: number;
  child_records?: ChildRecord[] | null;
}