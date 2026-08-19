import {
  getSticker,
  isStickerCode,
  KAOMOJI_CODES,
  MAX_KAOMOJI_LENGTH,
  STICKER_DOMAIN_URL,
  STICKER_SETS,
} from './stickers';

const allCodes = STICKER_SETS.flatMap((set) => set.codes);

describe('sticker catalog', () => {
  test('contains the complete legacy catalog', () => {
    expect(Object.fromEntries(STICKER_SETS.map((set) => [set.id, set.codes.length]))).toEqual({
      tv: 102,
      tv_vs: 39,
      tv_500: 30,
      bgm: 23,
      musume: 116,
      blake: 118,
      kaomoji: 16,
    });
    expect(allCodes).toHaveLength(444);
    expect(new Set(allCodes).size).toBe(allCodes.length);

    const stickers = allCodes.map((code) => getSticker(code)!);
    expect(new Set(stickers.map((sticker) => sticker.smileid)).size).toBe(stickers.length);
    expect(
      stickers.every(
        (sticker) =>
          sticker.url.startsWith(`${STICKER_DOMAIN_URL}/img/smiles/`) &&
          sticker.width > 0 &&
          sticker.height > 0,
      ),
    ).toBe(true);
  });

  test.each([
    ['(=A=)', '/img/smiles/1.gif', '1'],
    ['(bgm01)', '/img/smiles/bgm/01.png', '17'],
    ['(bgm23)', '/img/smiles/bgm/23.gif', '39'],
    ['(bgm124)', '/img/smiles/tv/101.gif', '140'],
    ['(bgm125)', '/img/smiles/tv/102.gif', '141'],
    ['(bgm200)', '/img/smiles/tv_vs/bgm_200.png', '216'],
    ['(bgm500)', '/img/smiles/tv_500/bgm_500.gif', '516'],
    ['(bgm502)', '/img/smiles/tv_500/bgm_502.png', '518'],
    ['(musume_118)', '/img/smiles/musume/musume_118.gif', 'musume_118'],
    ['(blake_97)', '/img/smiles/blake/blake_97.gif', 'blake_97'],
  ])('resolves %s', (code, path, smileid) => {
    expect(getSticker(code)).toMatchObject({
      url: `${STICKER_DOMAIN_URL}${path}`,
      smileid,
    });
  });

  test('normalizes bgm codes and rejects catalog gaps', () => {
    expect(getSticker('(bgm1)')).toBe(getSticker('(bgm01)'));
    expect(getSticker('(bgm038)')).toBe(getSticker('(bgm38)'));
    for (const code of ['(bgm126)', '(bgm199)', '(bgm239)', '(bgm530)', '(musume_97)']) {
      expect(isStickerCode(code), code).toBe(false);
    }
    expect(isStickerCode('(blake_97)')).toBe(true);
  });

  test('provides character names and semantic sections', () => {
    expect(getSticker('(musume_79)')).toMatchObject({ name: '摸头', large: true, width: 240 });
    expect(getSticker('(blake_97)')!.name).toBe('得分(0分)');
    for (const prefix of ['musume', 'blake']) {
      expect([1, 2, 3, 4, 5].map((id) => getSticker(`(${prefix}_0${id})`)?.name)).toEqual([
        'Bits',
        '硬币',
        '喜欢',
        '点赞',
        '收藏',
      ]);
    }
    for (const set of STICKER_SETS.filter(({ large }) => large)) {
      expect(set.sections?.map(({ name }) => name)).toEqual([
        '情绪反应',
        '动作道具',
        '日常状态',
        '提示反馈',
      ]);
      expect(set.sections!.flatMap(({ codes }) => codes)).toEqual(set.codes);
    }
  });

  test('provides the parser lookahead length', () => {
    expect(MAX_KAOMOJI_LENGTH).toBe(Math.max(...KAOMOJI_CODES.map((code) => code.length)));
  });
});
