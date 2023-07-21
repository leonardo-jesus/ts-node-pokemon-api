import 'reflect-metadata';
import { app } from './config/app';

app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`✅ Application running on port ${process.env.PORT}`);
});
