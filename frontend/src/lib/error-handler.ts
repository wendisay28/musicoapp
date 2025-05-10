export class AppError extends Error {
    constructor(code, message, status = 500, data) {
        super(message);
        this.code = code;
        this.status = status;
        this.data = data;
        this.name = 'AppError';
    }
}
export function handleApiError(error) {
    if (error instanceof AppError) {
        return error;
    }
    if (error.response) {
        const { status, data } = error.response;
        return new AppError(data.code || 'API_ERROR', data.message || 'Error en la solicitud', status, data);
    }
    if (error.request) {
        return new AppError('NETWORK_ERROR', 'Error de conexión. Por favor, verifica tu conexión a internet.', 0);
    }
    return new AppError('UNKNOWN_ERROR', 'Ha ocurrido un error inesperado.', 500);
}
