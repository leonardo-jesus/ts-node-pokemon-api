import axios from 'axios';
import { IAbility, IPokemon } from '../types/Pokemon';

class PokemonsService {
    public async getPokemonAbilitiesAlphabetically(pokemonName: string): Promise<IAbility[]> {
        const { abilities } = await this.getPokemonFromApi(pokemonName);

        return this.sortPokemonAbilitiesAlphabetically(abilities);
    }

    private async getPokemonFromApi(pokemonName: string): Promise<IPokemon> {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

            return data;
        } catch (error) {
            throw error;
        }
    }

    private sortPokemonAbilitiesAlphabetically(abilities: IAbility[]): IAbility[] {
        return abilities.sort((firstAbility: IAbility, secondAbility: IAbility) =>
            firstAbility.ability.name > secondAbility.ability.name ? 1 : -1,
        );
    }
}

export default PokemonsService;
