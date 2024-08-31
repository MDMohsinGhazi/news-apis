import { Request, Response } from 'express';

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

const errorHandler = (err: any, req: Request, res: Response) => {
    let statusCode = err.statusCode || 500;
    const status = err.status || err.code || 'error';
    const message = err.message || 'Unexpected error occurred';

    if (status === 'ERR_BAD_REQUEST') {
        statusCode = 404;
    }

    res.status(statusCode).json({
        status: status,
        message: message,
    });
};

export { ErrorResponse, errorHandler };
