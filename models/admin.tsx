export interface Admin {
  id?: number;
  name?: string | null;
  email?: string;
  active?: boolean;
  is_super_admin?: boolean;
  user_created_by?: Admin | null;
  created_at?: string;
  updated_at?: string;
}