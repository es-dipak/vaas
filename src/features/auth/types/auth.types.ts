export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}
