import type { ForgotPasswordInput, LoginInput, SignupInput } from '@/features/auth/schemas';
import { httpClient } from '@/lib/api/http-client';

/** Authenticated user as returned by the auth endpoints. */
export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
}

/** Successful authentication response (access token + user). */
export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

const AUTH_BASE = '/api/v1/auth';

export function login(input: LoginInput): Promise<AuthResponse> {
  return httpClient.post<AuthResponse>(`${AUTH_BASE}/login`, input);
}

export function signup(input: SignupInput): Promise<AuthResponse> {
  // The confirmation field is client-side only; never send it to the server.
  const { confirmPassword: _confirmPassword, ...payload } = input;
  return httpClient.post<AuthResponse>(`${AUTH_BASE}/signup`, payload);
}

export function requestPasswordReset(input: ForgotPasswordInput): Promise<{ message: string }> {
  return httpClient.post<{ message: string }>(`${AUTH_BASE}/forgot-password`, input);
}
