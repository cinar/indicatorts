# Contributing to Indicator TS

Thank you for your interest in contributing. Please read the [Code of Conduct](./CODE_OF_CONDUCT.md) first.

## Reporting a bug

1. Search the [issues](https://github.com/cinar/indicatorts/issues) to see whether it has already been reported.
2. If not, open a new issue using the bug report template. Include a clear title, the input data, the expected and actual output and, if possible, a failing test case.

## Development setup

The project requires Node.js 22 or later. A [devcontainer](.devcontainer/devcontainer.json) is also provided.

```bash
npm ci
npm run lint   # ESLint with type-aware rules
npm test       # Vitest, including coverage and API consistency checks
npm run docs   # Regenerates the indicator and strategy README files
npm run build  # Builds the ESM, CJS and type declaration outputs
```

`npm run fix` formats the code with Prettier and applies the automatic ESLint fixes.

## Coding standards

### No runtime dependencies

The published package has no runtime dependencies, and it must stay that way. The `dependencies`, `peerDependencies` and `optionalDependencies` fields of `package.json` must stay empty; a test enforces this. A new development dependency needs a clear justification in the pull request.

### Indicator pattern

Each indicator lives in its own file under `src/indicator/<category>/` and follows the existing pattern:

- An optional `<Name>Config` interface and a `<Name>DefaultConfig` constant. The configuration parameter is optional, and partial configurations are merged with the defaults.
- A short exported function name (e.g. `rsi`) and, where it helps, a descriptive alias (`export { rsi as relativeStrengthIndex }`).
- Output arrays have the same length as the input arrays.
- Reuse the existing building blocks in `src/helper` and other indicators (for example, use `ema` rather than reimplementing an exponential moving average).
- Export the module from its category `index.ts`.

Example strategies live under `examples/<category>/`, are exported from their `index.ts`, and are listed in [`examples/strategyInfo.ts`](examples/strategyInfo.ts).

### Copyright header

Every TypeScript file starts with:

```TypeScript
// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts
```

### Documentation

The README files under `src/indicator/<category>/` and `examples/<category>/` are generated from JSDoc by [`scripts/generateDocs.mjs`](scripts/generateDocs.mjs). Do not edit them by hand. Instead, document the code:

- Every exported declaration has a JSDoc comment.
- The main function of each module has a `@title` tag with the README section title, a description, the formula in a fenced code block, `@example` usage, and `@param`/`@return` tags.
- Configuration options and result fields are picked up from the `Config`/`DefaultConfig`/`Result` declarations automatically.

Run `npm run docs` and commit the regenerated README files. `npm test` fails if they are out of date.

Documentation, comments, commit messages and pull request descriptions are technical and descriptive: what a value measures and how it is computed. This is an educational library, not investment advice, so avoid prescriptive or buy/sell framing such as "indicates bullish" or "buy when".

## Testing

The project keeps 100% statement, branch, function and line coverage, enforced by the Vitest thresholds. Add tests instead of lowering the thresholds or excluding code from coverage.

### Reference data tests

Every indicator and example strategy is tested against a year of daily price data stored as CSV:

- Indicators: `src/indicator/<category>/testdata/<module>.csv`, checked by a `should match the reference data` test in `<module>.test.ts`.
- Strategies: `examples/<category>/testdata/<module>.csv`, checked by the table in `examples/<category>/referenceData.test.ts`.

Each CSV has a header row. The input columns are named `date`, `open`, `high`, `low`, `close` and `volume` (only the ones the indicator needs), followed by one column per output, named after the function (single output) or the result field (multiple outputs). Strategies use an `action` column (`-1` sell, `0` hold, `1` buy). Expected values are rounded to two digits.

```TypeScript
import { join } from 'path';
import { assertColumn, readCsv } from '../../testing/csv';

it('should match the reference data', () => {
  const data = readCsv(join(__dirname, 'testdata/movingAverageConvergenceDivergence.csv'));
  const actual = macd(data.close);
  assertColumn(actual.macdLine, data.macdLine);
  assertColumn(actual.signalLine, data.signalLine);
});
```

For a **new** indicator, the expected values must come from an independent source, such as the [Go version of this library](https://github.com/cinar/indicator) (its `testdata` folders use the same price data), a published reference implementation, or a worked example from the indicator's original source. Do not generate them from the implementation under test, which would only prove that the code agrees with itself. Mention the source in the test file.

The existing reference files were captured from this library's output, to serve as regression baselines. Changing them is a behavior change: explain why in the pull request.

Keep the small hand-written tests as well. They cover configuration handling and edge cases such as empty input, NaN and mismatched lengths.

### API consistency

[`src/testing/apiConsistency.test.ts`](src/testing/apiConsistency.test.ts) checks the conventions above: copyright headers, JSDoc on exports, no runtime dependencies, `index.ts` exports, test and CSV files, strategy registration and up-to-date generated docs. It discovers new files automatically.

## Pull requests

1. Make sure `npm run lint` and `npm test` pass, and that the regenerated docs are committed.
2. Describe the change and link the related issue.
3. Releases are published by the maintainers.

Thank you for helping to make Indicator TS better.
