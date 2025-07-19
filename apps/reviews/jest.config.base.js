module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  reporters: ['default'],
  collectCoverage: false,
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['./test/', './node_modules/', './packages/', './tools/'],
  setupFiles: ['<rootDir>/jest.environment.js'],
  testEnvironment: 'node',
  testTimeout: 30000,
  workerIdleMemoryLimit: '1024MB',
  moduleNameMapper: {
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@test-utils/(.*)$': '<rootDir>/test/$1',
    '^@apps/(.*)$': '<rootDir>/src/cmd/$1',
  },
}
