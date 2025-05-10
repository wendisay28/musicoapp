import { apiClient } from '@/lib/api';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface CreatePermissionData {
  name: string;
  description: string;
  category: string;
}

export interface UpdatePermissionData {
  name?: string;
  description?: string;
  category?: string;
}

export const getPermissions = async (filters?: { category?: string; search?: string }, page = 1, limit = 20): Promise<{ permissions: Permission[]; total: number }> => {
  const response = await apiClient.get<{ permissions: Permission[]; total: number }>('/permissions', {
    params: { ...filters, page, limit }
  });
  return response.data;
};

export const getPermissionById = async (id: string): Promise<Permission> => {
  const response = await apiClient.get<Permission>(`/permissions/${id}`);
  return response.data;
};

export const createPermission = async (data: CreatePermissionData): Promise<Permission> => {
  const response = await apiClient.post<Permission>('/permissions', data);
  return response.data;
};

export const updatePermission = async (id: string, data: UpdatePermissionData): Promise<Permission> => {
  const response = await apiClient.put<Permission>(`/permissions/${id}`, data);
  return response.data;
};

export const deletePermission = async (id: string): Promise<void> => {
  await apiClient.delete(`/permissions/${id}`);
};

export const getPermissionCategories = async (): Promise<string[]> => {
  const response = await apiClient.get<string[]>('/permissions/categories');
  return response.data;
};

export const getPermissionsByCategory = async (category: string): Promise<Permission[]> => {
  const response = await apiClient.get<Permission[]>(`/permissions/category/${category}`);
  return response.data;
};

export const getUserPermissions = async (userId: string): Promise<Permission[]> => {
  const response = await apiClient.get<Permission[]>(`/users/${userId}/permissions`);
  return response.data;
};

export const checkUserPermission = async (userId: string, permissionName: string): Promise<boolean> => {
  const response = await apiClient.get<{ hasPermission: boolean }>(`/users/${userId}/permissions/check`, {
    params: { permission: permissionName }
  });
  return response.data.hasPermission;
}; 