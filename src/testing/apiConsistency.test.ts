// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

// Guards library-wide conventions that are easy to forget when adding a new
// indicator or example strategy. New files are discovered automatically, so
// this test only needs to change when a convention changes.

import { describe, it } from 'vitest';
import { deepStrictEqual } from 'assert';
import { execFileSync } from 'child_process';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { basename, dirname, join, relative } from 'path';
import * as ts from 'typescript';

const ROOT = join(__dirname, '..', '..');

const COPYRIGHT = [
  '// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.',
  '// https://github.com/cinar/indicatorts',
];

const INDICATOR_CATEGORIES = ['momentum', 'trend', 'volatility', 'volume'];
const STRATEGY_CATEGORIES = ['.', 'momentum', 'trend', 'volatility', 'volume'];

/** Lists the .ts files under the given directory, recursively. */
function listTsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listTsFiles(path);
    }
    return entry.name.endsWith('.ts') ? [path] : [];
  });
}

/** Lists the module files (not index or test files) directly in a dir. */
function listModules(dir: string): string[] {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.ts'))
    .filter((name) => name !== 'index.ts' && !name.endsWith('.test.ts'))
    .map((name) => join(dir, name));
}

const read = (path: string): string => readFileSync(path, 'utf8');
const rel = (path: string): string => relative(ROOT, path);
const moduleName = (path: string): string => basename(path, '.ts');

/** Returns the names of exported declarations that have no JSDoc comment. */
function undocumentedExports(path: string): string[] {
  const source = ts.createSourceFile(
    path,
    read(path),
    ts.ScriptTarget.Latest,
    true
  );
  const missing: string[] = [];

  for (const statement of source.statements) {
    const exported = ts
      .getModifiers(statement as ts.HasModifiers)
      ?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!exported) {
      continue;
    }

    let name: string | undefined;
    if (
      ts.isFunctionDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement) ||
      ts.isClassDeclaration(statement)
    ) {
      name = statement.name?.text;
    } else if (ts.isVariableStatement(statement)) {
      name = statement.declarationList.declarations
        .map((d) => d.name.getText(source))
        .join(', ');
    }

    if (
      name !== undefined &&
      ts.getJSDocCommentsAndTags(statement).length === 0
    ) {
      missing.push(name);
    }
  }

  return missing;
}

/** Asserts that the given list of problems is empty. */
function assertNoProblems(problems: string[]): void {
  deepStrictEqual(problems, []);
}

describe('API consistency', () => {
  const sourceFiles = [
    ...listTsFiles(join(ROOT, 'src')),
    ...listTsFiles(join(ROOT, 'examples')),
  ];

  const indicators = INDICATOR_CATEGORIES.flatMap((category) =>
    listModules(join(ROOT, 'src', 'indicator', category))
  );

  const strategies = STRATEGY_CATEGORIES.flatMap((category) =>
    listModules(join(ROOT, 'examples', category))
  ).filter((path) => moduleName(path).endsWith('Strategy'));

  it('should start every source file with the copyright header', () => {
    assertNoProblems(
      sourceFiles
        .filter((path) => {
          const lines = read(path).split(/\r?\n/);
          return lines[0] !== COPYRIGHT[0] || lines[1] !== COPYRIGHT[1];
        })
        .map(rel)
    );
  });

  it('should document every exported declaration with JSDoc', () => {
    assertNoProblems(
      sourceFiles
        .filter((path) => !path.endsWith('.test.ts'))
        .flatMap((path) =>
          undocumentedExports(path).map((name) => `${rel(path)}: ${name}`)
        )
    );
  });

  it('should not declare runtime dependencies', () => {
    const pkg = JSON.parse(read(join(ROOT, 'package.json'))) as Record<
      string,
      Record<string, string> | undefined
    >;
    assertNoProblems(
      ['dependencies', 'peerDependencies', 'optionalDependencies']
        .filter((field) => Object.keys(pkg[field] ?? {}).length > 0)
        .map((field) => `package.json: ${field}`)
    );
  });

  it('should have up to date generated docs', () => {
    // Fails with the list of stale READMEs; fix with "npm run docs".
    execFileSync(
      process.execPath,
      [join(ROOT, 'scripts', 'generateDocs.mjs'), '--check'],
      { stdio: 'pipe' }
    );
  });

  it('should find the indicators and strategies', () => {
    // Guards against the discovery above silently matching nothing.
    deepStrictEqual(indicators.length > 0 && strategies.length > 0, true);
  });

  for (const path of indicators) {
    const name = moduleName(path);
    const dir = dirname(path);

    describe(rel(path), () => {
      it('should be exported from its index.ts', () => {
        deepStrictEqual(
          read(join(dir, 'index.ts')).includes(`export * from './${name}';`),
          true
        );
      });

      it('should have a test file that checks its testdata CSV', () => {
        const testFile = join(dir, `${name}.test.ts`);
        deepStrictEqual(existsSync(testFile), true, `missing ${rel(testFile)}`);

        const csvFile = join(dir, 'testdata', `${name}.csv`);
        deepStrictEqual(existsSync(csvFile), true, `missing ${rel(csvFile)}`);

        deepStrictEqual(
          read(testFile).includes(`testdata/${name}.csv`),
          true,
          `${rel(testFile)} does not read testdata/${name}.csv`
        );
      });
    });
  }

  for (const path of strategies) {
    const name = moduleName(path);
    const dir = dirname(path);

    describe(rel(path), () => {
      it('should be exported from its index.ts', () => {
        deepStrictEqual(
          read(join(dir, 'index.ts')).includes(`export * from './${name}';`),
          true
        );
      });

      it('should be listed in STRATEGY_INFOS', () => {
        const prefix =
          dir === join(ROOT, 'examples') ? '.' : `./${basename(dir)}`;
        deepStrictEqual(
          read(join(ROOT, 'examples', 'strategyInfo.ts')).includes(
            `from '${prefix}/${name}';`
          ),
          true
        );
      });

      it('should be checked against its testdata CSV', () => {
        const csvFile = join(dir, 'testdata', `${name}.csv`);
        deepStrictEqual(existsSync(csvFile), true, `missing ${rel(csvFile)}`);

        deepStrictEqual(
          read(join(dir, 'referenceData.test.ts')).includes(`'${name}'`),
          true,
          `${name} is missing from ${rel(join(dir, 'referenceData.test.ts'))}`
        );
      });
    });
  }
});
