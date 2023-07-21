module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'node',
    coverageProvider: 'v8',
    roots: ['<rootDir>/tests'],
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        axios: 'axios/dist/node/axios.cjs',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
};
