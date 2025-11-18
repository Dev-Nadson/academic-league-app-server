class AppError extends Error {
    public readonly status_code: number;
    public readonly is_operational: boolean;

    constructor(message: string, status_code: number = 400) {
        super(message);
        this.status_code = status_code;
        this.is_operational = true;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409)
    }
}

class UnauthorizedError extends AppError {
    constructor(message: string = "Não autorizado") {
        super(message, 401);
    }
}

class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404)
    }
}

class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, 500)
    }
}

export { AppError, ConflictError, NotFoundError, UnauthorizedError, InternalServerError }