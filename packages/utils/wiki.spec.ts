import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

import yaml from 'js-yaml';

import {
  fromWikiElement,
  mergeWiki,
  parseWiki,
  stringifyWiki,
  toWikiElement,
  WikiTemplate,
} from './index';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const testsDir = path.resolve(dirname, 'wiki-syntax-spec/tests/');

const validTestDir = path.resolve(testsDir, 'valid');
const invalidTestDir = path.resolve(testsDir, 'invalid');

const validTestFiles = fs.readdirSync(validTestDir);

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

const TVAnimeWiki = parseWiki(WikiTemplate.TVAnime);
const TVAnimeWikiString = stringifyWiki(TVAnimeWiki);

describe('mergeWiki', () => {
  it('omit wiki item that has empty key or empty value', () => {
    const mergedWiki = mergeWiki(TVAnimeWiki)({
      type: 'test',
      data: [
        {
          key: '',
          value: '',
        },
        {
          key: '   ',
          value: '',
        },
        {
          key: "I'm key",
          value: '   ',
        },
        {
          key: '  ',
          value: "I'm value",
        },
        {
          key: '',
          value: "I'm value",
        },
      ],
    });

    expect(stringifyWiki(mergedWiki)).toBe(TVAnimeWikiString);
  });

  it('omit wiki item that value is "*"', () => {
    const mergedWiki = mergeWiki(TVAnimeWiki)({
      type: 'test',
      data: [
        {
          key: 'single-star',
          value: '*',
        },
        {
          key: 'star-with-space-suffix',
          value: '*    ',
        },
        {
          key: 'star-with-space-prefix',
          value: '   *',
        },
        {
          key: 'star-with-space-between',
          value: '   * ',
        },
      ],
    });

    expect(stringifyWiki(mergedWiki)).toBe(TVAnimeWikiString);
  });

  it('merge wiki properly', () => {
    const mergedWiki = mergeWiki(TVAnimeWiki)({
      type: 'test',
      data: [
        {
          key: 'character',
          array: true,
          values: [
            {
              k: '',
              v: 'boqi',
            },
            {
              k: '',
              v: 'nijika',
            },
            {
              k: '先辈',
              v: 'ryo',
            },
            {
              v: 'kita',
            },
          ],
        },
        {
          key: 'a',
          value: 'b',
        },
        {
          key: '妖幻',
          value: '三重奏',
        },
        {
          key: '艺三',
          value: '',
        },
      ],
    });
    expect(stringifyWiki(mergedWiki)).toBe(`{{Infobox animanga/TVAnime
|中文名 = 
|别名 = {
}
|话数 = *
|放送开始 = *
|放送星期 = 
|官方网站 = 
|播放电视台 = 
|其他电视台 = 
|播放结束 = 
|其他 = 
|Copyright = 
|character = {
[boqi]
[nijika]
[先辈|ryo]
[kita]
}
|a = b
|妖幻 = 三重奏
}}`);
  });
});
