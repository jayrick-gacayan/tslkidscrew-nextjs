import { ChildRecord } from "./child-record";
import { LocationPlace } from "./location-place";
import { LocationProgram } from "./location-program";

export interface RegistrationRecord {
  id?: number;
  child_records?: ChildRecord[] | null;
  program?: string | null;
  date?: string | null;
  is_active?: boolean | null;
  locationPlace?: LocationPlace | null;
  locationProgram?: LocationProgram | null;
}