# Indicator TS

Technical analysis indicators, example strategies and a backtest framework in TypeScript. Indicators take and return plain `number[]` arrays (the [Go version](https://github.com/cinar/indicator) uses channels; do not port that design). Full conventions are in [CONTRIBUTING.md](CONTRIBUTING.md); the rules below are the ones that must never be broken.

## Rules

- **No runtime dependencies.** `dependencies`, `peerDependencies` and `optionalDependencies` in `package.json` stay empty. A new devDependency needs a stated reason and the maintainer's approval before it is added.
- **CSV reference tests.** Every indicator and example strategy has a `testdata/<module>.csv` checked with `readCsv`/`assertColumn` from `src/testing/csv.ts` (see CONTRIBUTING.md for the format). For a new indicator, the expected values must come from an independent source (the Go library's testdata, a reference implementation, or a published worked example), never from the code under test. Never regenerate or edit existing CSVs to make a failing test pass; a changed expected value is a behavior change that must be called out.
- **100% coverage.** Do not lower the Vitest thresholds or add coverage-ignore comments; write the missing tests.
- **No advisory language.** This is an educational library. Comments, JSDoc, docs, commit messages and PR descriptions describe what a value measures and how it is computed, never what to do (no "indicates bullish", "buy when", "predicts").
- **Generated docs.** `src/indicator/*/README.md` and `examples/*/README.md` are generated from JSDoc by `npm run docs`; edit the JSDoc, never those READMEs.

## New indicator checklist

1. `src/indicator/<category>/<camelCaseName>.ts` with the copyright header, `<Name>Config`/`<Name>DefaultConfig`, and JSDoc on every export. The main function's JSDoc has `@title`, a description, a fenced formula, `@example`, `@param` and `@return`.
2. Reuse `src/helper` and existing indicators instead of reimplementing them.
3. Export it from the category `index.ts` and add it to the root `README.md` list.
4. `<camelCaseName>.test.ts` with edge-case tests plus a `should match the reference data` test against `testdata/<camelCaseName>.csv`.
5. Run `npm run docs`.

`src/testing/apiConsistency.test.ts` enforces most of this list.

## Before finishing

```bash
npm run fix && npm run docs && npm run lint && npm test
```

All must pass, and regenerated READMEs must be committed with the change.
