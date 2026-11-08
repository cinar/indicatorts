// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

// Regenerates the API reference in each category README.md with
// tsdoc-markdown. The generated part sits between the TSDOC_START and
// TSDOC_END markers; the rest of each README is written by hand.

import { readdirSync } from 'fs';
import { join } from 'path';
import { generateDocumentation } from 'tsdoc-markdown';

/** Category directories whose README.md holds a generated API reference. */
const CATEGORIES = [
  'src/indicator/momentum',
  'src/indicator/trend',
  'src/indicator/volatility',
  'src/indicator/volume',
  'examples/momentum',
  'examples/trend',
  'examples/volatility',
  'examples/volume',
];

/**
 * Lists the module files of a category, leaving out the index and test files.
 *
 * @param {string} dir category directory.
 * @return {string[]} module file paths.
 */
function listModules(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.ts'))
    .filter((name) => name !== 'index.ts' && !name.endsWith('.test.ts'))
    .sort()
    .map((name) => join(dir, name));
}

for (const category of CATEGORIES) {
  generateDocumentation({
    inputFiles: listModules(category),
    outputFile: join(category, 'README.md'),
    markdownOptions: { emoji: null, headingLevel: '##' },
    buildOptions: {
      types: true,
      repo: { url: 'https://github.com/cinar/indicatorts', branch: 'main' },
    },
  });
}
