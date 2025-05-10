import { apiClient } from '@/lib/api';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
}

export interface CreateRoleData {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissions?: string[];
}

export const getRoles = async (page = 1, limit = 20): Promise<{ roles: Role[]; total: number }> => {
  const response = await apiClient.get<{ roles: Role[]; total: number }>('/roles', {
    params: { page, limit }
  });
  return response.data;
};

export const getRoleById = async (id: string): Promise<Role> => {
  const response = await apiClient.get<Role>(`/roles/${id}`);
  return response.data;
};

export const createRole = async (data: CreateRoleData): Promise<Role> => {
  const response = await apiClient.post<Role>('/roles', data);
  return response.data;
};

export const updateRole = async (id: string, data: UpdateRoleData): Promise<Role> => {
  const response = await apiClient.put<Role>(`/roles/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: string): Promise<void> => {
  await apiClient.delete(`/roles/${id}`);
};

export const getPermissions = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/roles/permissions');
  return response.data;
};

export const assignRoleToUser = async (userId: string, roleId: string): Promise<void> => {
  await apiClient.post(`/roles/${roleId}/users/${userId}`);
};

export const removeRoleFromUser = async (userId: string, roleId: string): Promise<void> => {
  await apiClient.delete(`/roles/${roleId}/users/${userId}`);
};

export const getUserRoles = async (userId: string): Promise<Role[]> => {
  const response = await apiClient.get<Role[]>(`/users/${userId}/roles`);
  return response.data;
}; 