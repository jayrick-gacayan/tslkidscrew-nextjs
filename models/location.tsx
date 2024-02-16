import { Admin } from "./admin";

export interface LocationPlace {
  id?: number;
  name?: string | null;
  address?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted?: false,
  minimum_age?: number | null;
  director?: Admin | null;
  program_count?: number | null;
}