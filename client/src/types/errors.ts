export class ApiError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly status: number,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  error: ApiError;
  validationErrors?: ValidationError[];
}

export type ErrorHandler = (error: unknown) => void;

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'field' in error &&
    'message' in error
  );
}; 