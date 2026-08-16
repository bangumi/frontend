import { defineTextStyles } from '@pandacss/dev';

export const textStyleDefinitions = {
  meta: {
    description: '时间、票数、作者、来源等主对象的极短辅助信息；不承担列表项识别。',
    value: { fontSize: 'meta', lineHeight: 'meta', fontWeight: 'normal' },
  },
  bodySm: {
    description:
      '紧凑列表、表格、定义列表中的身份标签或正文；图片、状态或上下文已承担主要识别时使用，不作为列表项的内容标题。',
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
    description:
      '控件标签、页签、列表标题；用于列表项的主要内容对象，用户应通过这段文字比较、辨认或选择项目。',
    value: { fontSize: 'label', lineHeight: 'label', fontWeight: 'medium' },
  },
  titleSm: {
    description: '带摘要或作者信息的独立内容单元标题，例如评论文章标题。',
    value: { fontSize: 'titleSm', lineHeight: 'titleSm', fontWeight: 'semibold' },
  },
  sectionTitle: {
    description: '详情页、资料页的内容分区标题；以较大字号和轻字重建立编辑式层级。',
    value: {
      fontSize: 'sectionTitle',
      lineHeight: 'sectionTitle',
      fontWeight: 'section',
    },
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
