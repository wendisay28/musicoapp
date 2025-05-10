export class ApiError extends Error {
    constructor(code, message, status, details) {
        super(message);
        this.code = code;
        this.message = message;
        this.status = status;
        this.details = details;
        this.name = 'ApiError';
    }
}
export const isApiError: any = (error) => {
    return error instanceof ApiError;
};
export const isValidationError: any = (error) => {
    return (typeof error === 'object' &&
        error !== null &&
        'field' in error &&
        'message' in error);
};
