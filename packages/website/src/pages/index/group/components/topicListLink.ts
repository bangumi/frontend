import { css } from '@bangumi/styled-system/css';

/**
 * 话题列表内的链接样式。
 *
 * 配合 Typography.Link 的 noStyle 使用，不依赖 .bgm-link 的 less 注入样式，
 * 避免未分层 less 样式覆盖 Panda layer 的问题。颜色对齐旧版 a.l
 * （#0084b4，白底对比度 4.23:1）。
 */
export const topicListLink = css({
  display: 'inline-block',
  color: '#0084b4',
  cursor: 'pointer',
  fontWeight: 'bold',
  textDecoration: 'none',
  _hover: {
    color: '#02a3fb',
    textDecoration: 'underline',
  },
});
