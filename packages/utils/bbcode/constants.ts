export const BGM_STICKER_START_STR = '(bgm';
// 最长的emoji: (=///=)
export const MAX_EMOJI_LENGTH = 7;

export const EMOJI_ARRAY = [
  '(=A=)',
  '(=w=)',
  '(-w=)',
  '(S_S)',
  '(=v=)',
  '(@_@)',
  '(=W=)',
  '(TAT)',
  '(T_T)',
  "(='=)",
  '(=3=)',
  "(= =')",
  '(=///=)',
  '(=.,=)',
  '(:P)',
  '(LOL)',
];

export const STICKER_DOMAIN_URL = 'https://lain.bgm.tv';

// Bangumi 角色贴纸 (musume_XX)/(blake_XX)。id 范围与旧站 smilies_list 一致：
// musume 缺失 97、98（这两个编号为 blake 专属）
export const CHARACTER_STICKER_SETS = [
  {
    prefix: 'musume',
    ranges: [
      { start: 1, end: 96 },
      { start: 99, end: 118 },
    ],
  },
  {
    prefix: 'blake',
    ranges: [{ start: 1, end: 98 }],
  },
] as const;
