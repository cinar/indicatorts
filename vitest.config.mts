import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**'],
    environment: 'node',
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'lcov'],
      // Measure every source file, not only the ones a test happens to import.
      include: ['src/**/*.ts', 'examples/**/*.ts'],
      exclude: ['**/*.test.ts', '**/index.ts'],
      // Fail the test run if coverage drops below its current level.
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
