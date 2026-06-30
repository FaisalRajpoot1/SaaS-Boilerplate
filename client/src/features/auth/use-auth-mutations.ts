import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { login, requestPasswordReset, signup, type AuthResponse } from '@/features/auth/api';
import type { ForgotPasswordInput, LoginInput, SignupInput } from '@/features/auth/schemas';
import type { ApiError } from '@/lib/api/http-client';

export function useLogin(): UseMutationResult<AuthResponse, ApiError, LoginInput> {
  return useMutation({ mutationFn: login });
}

export function useSignup(): UseMutationResult<AuthResponse, ApiError, SignupInput> {
  return useMutation({ mutationFn: signup });
}

export function useForgotPassword(): UseMutationResult<
  { message: string },
  ApiError,
  ForgotPasswordInput
> {
  return useMutation({ mutationFn: requestPasswordReset });
}
