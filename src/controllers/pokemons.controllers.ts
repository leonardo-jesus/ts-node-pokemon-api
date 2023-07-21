import { Request, Response } from 'express';
import PokemonsService from '../services/pokemons.service';
import { AxiosError } from 'axios';

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

        return res.status(200).json({ abilities });
    } catch (error) {
        if (error instanceof AxiosError) {
            const err = error as AxiosError;
            return res.status(err.response?.status as number).json(err.response?.data);
        }

        return res.status(400).json({ message: error });
    }
};
