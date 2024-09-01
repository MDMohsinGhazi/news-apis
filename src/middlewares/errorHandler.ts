import { Request, Response } from 'express';
import { ErrorResponse } from '../utils/ErrorResponse';

const errorHandler = (err: any, req: Request, res: Response) => {
    let statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    const message = err.message || 'Unexpected error occurred';

    if (err instanceof ErrorResponse) {
        return res.status(err.statusCode).json(err);
    }

    if (err.code === 'ERR_BAD_REQUEST') {
        statusCode = 400;
    }

    res.status(statusCode).json({
        status: status,
        message: message,
    });
};

export { errorHandler };
