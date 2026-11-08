/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  collectCoverage: true,
  // Measure every source file, not only the ones a test happens to import.
  collectCoverageFrom: [
    'src/**/*.ts',
    'examples/**/*.ts',
    '!**/*.test.ts',
    '!**/index.ts',
  ],
};
