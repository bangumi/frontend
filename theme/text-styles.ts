import { defineTextStyles } from '@pandacss/dev';

export const textStyleDefinitions = {
  meta: {
    description: '时间、票数、极短辅助信息',
    value: { fontSize: 'meta', lineHeight: 'meta', fontWeight: 'normal' },
  },
  bodySm: {
    description: '紧凑列表、表格、定义列表',
    value: { fontSize: 'bodySm', lineHeight: 'bodySm', fontWeight: 'normal' },
  },
  body: {
    description: '默认正文、评论摘要、表单',
    value: { fontSize: 'body', lineHeight: 'body', fontWeight: 'normal' },
  },
  bodyLg: {
    description: '长文阅读、重要评论正文',
    value: { fontSize: 'bodyLg', lineHeight: 'bodyLg', fontWeight: 'normal' },
  },
  label: {
    description: '控件标签、页签、列表标题',
    value: { fontSize: 'label', lineHeight: 'label', fontWeight: 'medium' },
  },
  titleSm: {
    description: '小节标题、卡片/面板标题',
    value: { fontSize: 'titleSm', lineHeight: 'titleSm', fontWeight: 'semibold' },
  },
  title: {
    description: '页面/条目标题',
    value: { fontSize: 'title', lineHeight: 'title', fontWeight: 'title' },
  },
  display: {
    description: '仅用于少数独立页面标题',
    value: { fontSize: 'display', lineHeight: 'display', fontWeight: 'title' },
  },
} as const;

export const textStyles = defineTextStyles(textStyleDefinitions);
