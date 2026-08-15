import type { Meta, StoryObj } from '@storybook/react';

import { css } from '@bangumi/styled-system/css';

/** 冻结 token 前用于检查断行、字体回退与行高的固定语料。 */
const samples = {
  zh: '《SHIROBAKO》讲述五名女生在动画业界追梦的故事，是 P.A.WORKS 制作的原创电视动画。',
  ja: 'サクラノ詩 －櫻の森の上を舞う－ オリジナルサウンドトラック',
  mixed: '2014 年 10 月 9 日放送开始，全 24 话，Blu-ray BOX 由 Aniplex 发行。',
  longTitle:
    '劇場版 魔法少女まどか☆マギカ ［新編］叛逆の物語 —— 一个非常长的中文副标题用于检查标题换行行为',
  longUserName: 'a-very-long-user-name-that-should-not-break-the-layout-2026',
  numbers: '8.4 / 12,345 人评分 / Rank #128',
};

const styleKeys = [
  'meta',
  'bodySm',
  'body',
  'bodyLg',
  'label',
  'titleSm',
  'title',
  'display',
] as const;

type StyleKey = (typeof styleKeys)[number];

const textStyles: Record<StyleKey, string> = {
  meta: css({ fontSize: 'meta', lineHeight: 'meta', fontWeight: 'normal' }),
  bodySm: css({ fontSize: 'bodySm', lineHeight: 'bodySm', fontWeight: 'normal' }),
  body: css({ fontSize: 'body', lineHeight: 'body', fontWeight: 'normal' }),
  bodyLg: css({ fontSize: 'bodyLg', lineHeight: 'bodyLg', fontWeight: 'normal' }),
  label: css({ fontSize: 'label', lineHeight: 'label', fontWeight: 'medium' }),
  titleSm: css({ fontSize: 'titleSm', lineHeight: 'titleSm', fontWeight: 'semibold' }),
  title: css({ fontSize: 'title', lineHeight: 'title', fontWeight: 'title' }),
  display: css({ fontSize: 'display', lineHeight: 'display', fontWeight: 'title' }),
};

const page = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '5',
  padding: '5',
  fontFamily: 'bgmSans',
  color: 'text.primary',
  backgroundColor: 'bg.canvas',
});

const row = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
  paddingBottom: '3',
  borderBottom: '1px solid',
  borderColor: 'border.subtle',
});

const rowLabel = css({
  fontSize: 'meta',
  lineHeight: 'meta',
  fontWeight: 'normal',
  color: 'text.tertiary',
  fontFamily: 'mono',
});

const readingColumn = css({
  width: 'container.reading',
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
});

const tabular = css({ fontVariantNumeric: 'tabular-nums' });

const truncated = css({
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Scale: StoryObj = {
  render: () => (
    <div className={page}>
      {styleKeys.map((key) => (
        <div className={row} key={key}>
          <span className={rowLabel}>textStyle: {key}</span>
          <p className={textStyles[key]}>{samples.zh}</p>
        </div>
      ))}
    </div>
  ),
};

export const CJKSpecimen: StoryObj = {
  name: '中日英混排样张',
  render: () => (
    <div className={page}>
      <div className={row}>
        <span className={rowLabel}>title / 长标题换行</span>
        <h1 className={textStyles.title}>{samples.longTitle}</h1>
      </div>
      <div className={row}>
        <span className={rowLabel}>bodyLg / 日文原名</span>
        <p className={textStyles.bodyLg}>{samples.ja}</p>
      </div>
      <div className={row}>
        <span className={rowLabel}>body / 中英数字混排</span>
        <p className={textStyles.body}>{samples.mixed}</p>
      </div>
      <div className={row}>
        <span className={rowLabel}>meta / tabular-nums</span>
        <p className={`${textStyles.meta} ${tabular}`}>{samples.numbers}</p>
      </div>
      <div className={row}>
        <span className={rowLabel}>bodySm / 长用户名截断</span>
        <p className={`${textStyles.bodySm} ${truncated}`}>{samples.longUserName}</p>
      </div>
    </div>
  ),
};

export const ReadingColumn: StoryObj = {
  name: '阅读列宽（container.reading）',
  render: () => (
    <div className={page}>
      <div className={readingColumn}>
        <h2 className={textStyles.titleSm}>长文阅读列不超过 720px</h2>
        <p className={textStyles.bodyLg}>{samples.zh.repeat(4)}</p>
        <p className={textStyles.bodyLg}>{samples.mixed.repeat(4)}</p>
      </div>
    </div>
  ),
};
