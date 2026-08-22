/**
 * BBCode 解析相关常量。
 *
 * 表情目录（代码、图片地址、分类）位于 `../stickers`，此处只保留解析器用到的字面量，
 * 并再导出 `STICKER_DOMAIN_URL` 以兼容既有引用。
 */

export { STICKER_DOMAIN_URL } from '@bangumi/utils/stickers.ts';

export const BGM_STICKER_START_STR = '(bgm';
