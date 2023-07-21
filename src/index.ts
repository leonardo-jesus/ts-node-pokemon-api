import express from 'express';
import routes from './routes/index';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`✅ Application running on port ${process.env.PORT}`);
});
