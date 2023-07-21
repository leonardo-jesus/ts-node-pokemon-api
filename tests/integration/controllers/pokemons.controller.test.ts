import { IAbility } from 'types/Pokemon';
import axios from 'axios';

jest.mock('axios');

import { app } from '../../../src/config/app';
import request from 'supertest';

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

const NOT_FOUND_BODY_MOCK = {
    message: 'Pokemon not found',
};

const ALPHABETICALLY_SORTED_ABILITIES_MOCK = {
    abilities: [
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
    ],
};

const getApiResponseMock = (abilities: IAbility[] | null) => ({
    data: {
        abilities,
    },
});

describe('GET /api/pokemons/:pokemon', () => {
    beforeEach(() => {
        mockedAxiosGet.mockReset();
    });

    it.each([
        [
            'when API response is ok, should return pokemon abilities in alphabetical order',
            getApiResponseMock(ABILITIES_MOCK),
            200,
            ALPHABETICALLY_SORTED_ABILITIES_MOCK,
        ],
        [
            'when API response is "Not found", should return 404 status code',
            new Error('Not Found'),
            404,
            NOT_FOUND_BODY_MOCK,
        ],
        [
            'when API response has abilities null, should return 404 status code',
            getApiResponseMock(null),
            404,
            NOT_FOUND_BODY_MOCK,
        ],
        [
            'when API response has abilities [], should return 404 status code',
            getApiResponseMock([]),
            404,
            NOT_FOUND_BODY_MOCK,
        ],
        ['when API response is null, should return 404 status code', null, 404, NOT_FOUND_BODY_MOCK],
    ])('%p', async (_description, apiResponseMock, expectedStatus, expectedBody) => {
        mockedAxiosGet.mockResolvedValue(apiResponseMock);

        return request(app)
            .get('/api/pokemons/ditto')
            .expect(expectedStatus)
            .then((response) => {
                expect(response.body).toStrictEqual(expectedBody);
            });
    });
});
