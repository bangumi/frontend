import { describe, expect, it } from 'vitest';

import { formatSubjectInfobox } from './infobox.ts';

describe('formatSubjectInfobox', () => {
  it('应隐藏 values 为空数组的项', () => {
    const infobox = [
      { key: '中文名', values: [] },
      { key: '话数', values: [{ v: '12' }] },
    ];
    expect(formatSubjectInfobox(infobox)).toEqual([{ key: '话数', values: [{ v: '12' }] }]);
  });

  it('应隐藏 values 全为空字符串的项', () => {
    const infobox = [
      { key: '导演', values: [{ v: '' }] },
      { key: '话数', values: [{ v: '12' }] },
    ];
    expect(formatSubjectInfobox(infobox)).toEqual([{ key: '话数', values: [{ v: '12' }] }]);
  });

  it('应过滤纯空白的 value 并只保留非空子项', () => {
    const infobox = [
      { key: '别名', values: [{ v: 'ワンピース エルバフ編' }, { v: '  ' }, { v: '' }] },
    ];
    expect(formatSubjectInfobox(infobox)).toEqual([
      { key: '别名', values: [{ v: 'ワンピース エルバフ編' }] },
    ]);
  });

  it('应隐藏 key 为空字符串的项', () => {
    const infobox = [
      { key: '', values: [{ v: 'x' }] },
      { key: '话数', values: [{ v: '12' }] },
    ];
    expect(formatSubjectInfobox(infobox)).toEqual([{ key: '话数', values: [{ v: '12' }] }]);
  });

  it('应将置顶 key 按预定顺序排在最前', () => {
    const infobox = [
      { key: '放送星期', values: [{ v: '星期日' }] },
      { key: '放送开始', values: [{ v: '2026年4月5日' }] },
      { key: '话数', values: [{ v: '*' }] },
      { key: '中文名', values: [{ v: '航海王 埃鲁巴夫篇' }] },
      { key: '别名', values: [{ v: '海贼王' }] },
    ];
    expect(formatSubjectInfobox(infobox).map((item) => item.key)).toEqual([
      '中文名',
      '话数',
      '放送开始',
      '放送星期',
      '别名',
    ]);
  });

  it('应将链接类 key 按预定顺序排到最后', () => {
    const infobox = [
      { key: '官方网站', values: [{ v: 'https://one-piece.com/' }] },
      { key: '话数', values: [{ v: '*' }] },
      { key: 'Blog', values: [{ v: 'https://blog.example' }] },
      { key: '播放电视台', values: [{ v: 'フジテレビ' }] },
    ];
    expect(formatSubjectInfobox(infobox).map((item) => item.key)).toEqual([
      '话数',
      '播放电视台',
      '官方网站',
      'Blog',
    ]);
  });

  it('应保持非置顶非置底项的原顺序', () => {
    const infobox = [
      { key: '音乐', values: [{ v: '田中公平' }] },
      { key: '原作', values: [{ v: '尾田栄一郎' }] },
      { key: '动画制作', values: [{ v: '東映アニメーション' }] },
    ];
    expect(formatSubjectInfobox(infobox).map((item) => item.key)).toEqual([
      '音乐',
      '原作',
      '动画制作',
    ]);
  });

  it('组合场景：过滤空值后按 置顶 → 原顺序 → 链接 排列', () => {
    const infobox = [
      { key: '导演', values: [{ v: '' }] },
      { key: '话数', values: [{ v: '*' }] },
      { key: '官方网站', values: [{ v: 'https://one-piece.com/' }] },
      { key: '别名', values: [{ v: '海贼王' }] },
      { key: '播放电视台', values: [{ v: '' }] },
      { key: '放送开始', values: [{ v: '2026年4月5日' }] },
      { key: '中文名', values: [{ v: '航海王 埃鲁巴夫篇' }] },
    ];
    expect(formatSubjectInfobox(infobox).map((item) => item.key)).toEqual([
      '中文名',
      '话数',
      '放送开始',
      '别名',
      '官方网站',
    ]);
  });
});
