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
    setupFiles: ['<rootDir>/jest.setup.js'],
};
