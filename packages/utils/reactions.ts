/**
 * 帖子反应（贴贴）工具。
 *
 * 反应（reaction）由服务端以数值 ID 表示，emoji 图片名映射取自 legacy
 * `LikeCore::$like_reactions`，图片由 `lain.bgm.tv` 提供。
 */

const STICKER_DOMAIN_URL = 'https://lain.bgm.tv';

/** reaction value -> tv 表情图片文件名 */
const REACTION_EMOJI_MAP: Readonly<Record<number, string>> = {
  0: '44', // bgm67
  79: '40', // bgm63
  54: '15', // bgm38
  140: '101', // bgm124
  62: '23', // bgm46
  122: '83', // bgm106
  104: '65', // bgm88
  80: '41', // bgm64
  141: '102', // bgm125
  88: '49', // bgm72
  85: '46', // bgm69
  90: '51', // bgm74
};

/** 当前用户可选的反应列表（与服务端 ALLOWED_COMMON_REACTIONS 一致） */
export const ALLOWED_REACTIONS: readonly number[] = Object.keys(REACTION_EMOJI_MAP).map(Number);

export function getReactionEmojiUrl(value: number): string {
  const file = REACTION_EMOJI_MAP[value];
  if (!file) {
    throw new Error(`unknown reaction value: ${value}`);
  }
  return `${STICKER_DOMAIN_URL}/img/smiles/tv/${file}.gif`;
}
