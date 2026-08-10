import apiClient from '@/services/api/apiClient';
import { API_ENDPOINTS } from '@/services/api/apiEndpoints';
import type { LoginCredentials } from '../types/auth.types';
import type { LoginResponse } from '@/services/api/apiTypes';
import type { ApiResponse } from '@/types/api.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  async getMe() {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },
};
