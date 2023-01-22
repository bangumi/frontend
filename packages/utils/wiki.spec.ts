import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

import { fromWikiElement, parseWiki, toWikiElement } from './index';

const testsDir = path.resolve(__dirname, 'wiki-syntax-spec/tests/');

const validTestDir = path.resolve(testsDir, 'valid');
const invalidTestDir = path.resolve(testsDir, 'invalid');

const validTestFiles = fs.readdirSync(validTestDir);
const inValidTestFiles = fs.readdirSync(invalidTestDir);

describe('fromWikiElement & toWikiElement', () => {
  for (const file of validTestFiles) {
    const [prefix, suffix] = file.split('.');
    if (suffix !== 'wiki') {
      continue;
    }

    if (!prefix) {
      throw new Error('BUG: undefined file path prefix');
    }

    test(`${prefix} should be valid`, () => {
      const testFilePath = path.resolve(validTestDir, file);
      const expectedFilePath = path.resolve(validTestDir, `${prefix}.yaml`);

      const testContent = fs.readFileSync(testFilePath, 'utf8');
      const expectedContent = fs.readFileSync(expectedFilePath, 'utf8');

      const wiki = parseWiki(testContent);
      const wikiElement = toWikiElement(wiki);
      const wikiItems = fromWikiElement(wikiElement);
      const expected = yaml.load(expectedContent);

      expect({
        type: wiki.type,
        data: wikiItems,
      }).toEqual(expected);
    });
  }
});
