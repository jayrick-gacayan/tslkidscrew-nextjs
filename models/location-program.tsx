import { Admin } from "./admin";
import { LocationPlace } from "./location";

export interface LocationProgram {
  id?: number;
  name?: string | null;
  director?: Admin | null;
  created_at?: string | null;
  updated_at?: string | null;
  locationPlace: LocationPlace;
  active?: boolean;
  capacity?: number | null;
  is_package_active?: boolean;
  subsidized_enrollment_enabled?: boolean;
  name_suffix?: string | null;
}