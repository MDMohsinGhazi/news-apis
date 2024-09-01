import express, { Request, Response } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookiParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './api';
import { ErrorResponse } from './utils/ErrorResponse';
import { errorHandler } from './middlewares/errorHandler';
import { NextFunction } from 'http-proxy-middleware/dist/types';

dotenv.config();

const app = express();

app.use(
    cors({
        credentials: true,
    }),
);

app.use(compression());
app.use(cookiParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/api/health', async (req: Request, res: Response) => {
    res.status(200).send({ message: 'health OK!' });
});

app.get('*', async (req: Request, res: Response, next: NextFunction) => {
    next(new ErrorResponse(`${req.originalUrl} route not found`, 404));
});

app.use(errorHandler);

const server = http.createServer(app);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});

// handele unhandeled promise rejection
process.on('unhandledRejection', (err: Error) => {
    console.log('Error', err.message);
    server.close(() => process.exit(1));
});
