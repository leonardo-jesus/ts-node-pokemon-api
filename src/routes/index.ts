import { Router } from 'express';
import pokemonsRouter from './pokemons.routes';
import healthcheckRouter from './healthcheck.routes';

const routes = Router();

routes.use('/api/healthcheck', healthcheckRouter);
routes.use('/api/pokemons', pokemonsRouter);

export default routes;
