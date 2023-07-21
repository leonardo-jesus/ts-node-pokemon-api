import { IAbility } from 'types/Pokemon';
import PokemonService from '../../../src/services/pokemons.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

const ABILITIES_MOCK = [
    {
        ability: {
            name: 'limber',
            url: 'https://pokeapi.co/api/v2/ability/7/',
        },
        is_hidden: false,
        slot: 1,
    },
    {
        ability: {
            name: 'imposter',
            url: 'https://pokeapi.co/api/v2/ability/150/',
        },
        is_hidden: true,
        slot: 3,
    },
];

const ALPHABETICALLY_SORTED_ABILITIES_MOCK = [
    {
        ability: {
            name: 'imposter',
            url: 'https://pokeapi.co/api/v2/ability/150/',
        },
        is_hidden: true,
        slot: 3,
    },
    {
        ability: {
            name: 'limber',
            url: 'https://pokeapi.co/api/v2/ability/7/',
        },
        is_hidden: false,
        slot: 1,
    },
];

const getApiResponseMock = (abilities: IAbility[] | null) => ({
    data: {
        abilities,
    },
});

describe('PokemonService', () => {
    beforeEach(() => {
        mockedAxiosGet.mockReset();
    });

    it.each([
        [
            'when call getPokemonAbilitiesAlphabetically, and API response is ok, should return pokemon abilities in alphabetical order',
            getApiResponseMock(ABILITIES_MOCK),
            ALPHABETICALLY_SORTED_ABILITIES_MOCK,
        ],
        [
            'when call getPokemonAbilitiesAlphabetically, and API response is "Not found", should return empty array',
            new Error('Not Found'),
            null,
        ],
        [
            'when call getPokemonAbilitiesAlphabetically, and API response has abilities null, should return empty array',
            getApiResponseMock(null),
            null,
        ],
        [
            'when call getPokemonAbilitiesAlphabetically, and API response has abilities [], should return empty array',
            getApiResponseMock([]),
            null,
        ],
        [
            'when call getPokemonAbilitiesAlphabetically, and API response is null, should return empty array',
            null,
            null,
        ],
    ])('%p', async (_description, apiResponseMock, expected) => {
        mockedAxiosGet.mockResolvedValue(apiResponseMock);

        const service = new PokemonService();
        const result = await service.getPokemonAbilitiesAlphabetically('ditto');

        expect(result).toStrictEqual(expected);
    });
});
