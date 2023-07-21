import axios from 'axios';
import { IAbility, IPokemon } from '../types/Pokemon';

class PokemonsService {
    public async getPokemonAbilitiesAlphabetically(pokemonName: string): Promise<IAbility[] | null> {
        const data = await this.getPokemonFromApi(pokemonName);

        if (!data || !data.abilities || data.abilities.length === 0) {
            return null;
        }

        return this.sortPokemonAbilitiesAlphabetically(data.abilities);
    }

    private async getPokemonFromApi(pokemonName: string): Promise<IPokemon | null> {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

            return data;
        } catch (error) {
            return null;
        }
    }

    private sortPokemonAbilitiesAlphabetically(abilities: IAbility[]): IAbility[] {
        return abilities.sort((firstAbility: IAbility, secondAbility: IAbility) =>
            firstAbility.ability.name > secondAbility.ability.name ? 1 : -1,
        );
    }
}

export default PokemonsService;
