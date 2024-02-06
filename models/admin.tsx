export interface Admin {
  name?: string;
  email?: string;
  is_active?: boolean;
  is_super_admin?: boolean;
  admin?: Admin | null;
}