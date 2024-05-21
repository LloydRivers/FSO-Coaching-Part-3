import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import setupMorgan from './morgan';
import startServer from './startServer';
import dotenv from 'dotenv';
import personRouter from './router/personRouter';
import infoRouter from './router/infoRouter';
import ErrorHandler from './helpers/error';

dotenv.config();
// These new to be added in the Enviroment section on render.com
const userName = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const url = `mongodb+srv://${userName}:${password}@cluster0.nnoxpyj.mongodb.net/`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const app: Application = express();
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
setupMorgan(app);
app.use('/api/persons', personRouter);
app.use('/info', infoRouter);
app.use(ErrorHandler);

const port = parseInt(process.env.PORT || '3001', 10);

startServer(port, app);
