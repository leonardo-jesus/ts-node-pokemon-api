import express from 'express';
import routes from '../routes/index';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
app.use(express.json());
app.use(routes);

export { app };
