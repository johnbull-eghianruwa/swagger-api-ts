import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import articlesRouter from './routes/articlesRouter';
import userRouter from './routes/userRouter';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger';
import { NextFunction, Request, Response } from "express";
import BaseError from './models/BaseError';


const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));

const PORT = process.env.PORT_DEV || 3001;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/articles', articlesRouter);

app.use('/users', userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: BaseError = {
        status: 404,
        message: 'Not Found',
        name: 'Not Found'
    };
    error.status = 404;
    next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});