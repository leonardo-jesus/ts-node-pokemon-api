import { Request, Response } from 'express';
import PokemonsService from '../services/pokemons.service';

export const pokemonsController = async (req: Request, res: Response) => {
    const pokemonFromUrlParam = req.params.pokemon;

    if (!pokemonFromUrlParam) {
        return res.status(400).json({
            message: 'Bad request',
        });
    }

    try {
        const pokemonsService = new PokemonsService();
        const abilities = await pokemonsService.getPokemonAbilitiesAlphabetically(pokemonFromUrlParam);

        if (!abilities || abilities.length === 0) {
            return res.status(404).json({
                message: 'Pokemon not found',
            });
        }

        return res.status(200).json({ abilities });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
