import { pokemonsController } from '../controllers/pokemons.controllers';
import { Router } from 'express';

const pokemonsRouter = Router();

pokemonsRouter.get('/:pokemon', pokemonsController);

export default pokemonsRouter;
