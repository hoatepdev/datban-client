export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateUserDTO {
  name?: string;
  email?: string;
}
