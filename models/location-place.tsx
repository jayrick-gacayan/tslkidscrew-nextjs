import { Admin } from './admin';

export interface LocationPlace {
  id?: number;
  name?: string | null;
  address?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted?: boolean;
  minimum_age?: number | null;
  director?: Admin | null;
  director_id?: number | null;
  programs_count?: number | null;
}