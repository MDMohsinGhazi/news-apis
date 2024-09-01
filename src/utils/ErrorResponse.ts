class ErrorResponse extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string) {
        return new ErrorResponse(message, 400);
    }

    static internal(message: string) {
        return new ErrorResponse(message, 500);
    }
}

export { ErrorResponse };
