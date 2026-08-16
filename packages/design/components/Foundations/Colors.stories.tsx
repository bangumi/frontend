import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

interface Swatch {
  name: string;
  path: string;
  value: string;
  usage: string;
}

const toCssVar = (path: string) => `var(--${path.replaceAll('.', '-')})`;

const toSwatch = (name: string, path: string, usage: string): Swatch => ({
  name,
  path,
  value: toCssVar(path),
  usage,
});

const toScale = (palette: string, steps: readonly number[], usage: string) =>
  steps.map((step) => toSwatch(`${palette}.${step}`, `colors.${palette}-${step}`, usage));

const palettes: Swatch[] = [
  toSwatch('brand.50', 'colors.brand-50', '极弱强调背景、选中行'),
  toSwatch('brand.100', 'colors.brand-100', '悬停背景、柔和提示'),
  toSwatch('brand.300', 'colors.brand-300', '装饰、非文本品牌识别'),
  toSwatch('brand.500', 'colors.brand-500', '默认品牌填充'),
  toSwatch('brand.600', 'colors.brand-600', '白字上的品牌底、主要操作'),
  toSwatch('brand.700', 'colors.brand-700', '按下态、强调文字'),
  toSwatch('brand.900', 'colors.brand-900', '深色主题中的品牌弱强调背景'),
  toSwatch('brand.950', 'colors.brand-950', '深色主题中的品牌深背景'),
  ...toScale('blue', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], '蓝色基础色阶'),
  ...toScale('cyan', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], '青色基础色阶'),
  ...toScale('green', [400, 700], '成功状态的基础色阶'),
  ...toScale('amber', [300, 700], '警告状态的基础色阶'),
  ...toScale('red', [400, 700], '危险状态的基础色阶'),
];

const surfaces: Swatch[] = [
  toSwatch('bg.canvas', 'colors.bg-canvas', '页面底色'),
  toSwatch('bg.subtle', 'colors.bg-subtle', '次级区域、交替列表行'),
  toSwatch('bg.muted', 'colors.bg-muted', '弱强调控件背景'),
  toSwatch('bg.raised', 'colors.bg-raised', '独立面板、弹层'),
  toSwatch('bg.inset', 'colors.bg-inset', '输入框、嵌入区域'),
  toSwatch('border.subtle', 'colors.border-subtle', '列表、分区细分隔'),
  toSwatch('border', 'colors.border', '输入与可识别边界'),
  toSwatch('border.strong', 'colors.border-strong', '悬停、强分隔'),
];

const foregrounds: Swatch[] = [
  toSwatch('text.primary', 'colors.text-primary', '正文、主标题'),
  toSwatch('text.secondary', 'colors.text-secondary', '元数据、次级正文'),
  toSwatch('text.tertiary', 'colors.text-tertiary', '辅助说明'),
  toSwatch('text.disabled', 'colors.text-disabled', '禁用态'),
];

const accents: Swatch[] = [
  toSwatch('accent', 'colors.accent', '品牌、当前态、强调填充'),
  toSwatch('accent.hover', 'colors.accent-hover', '悬停或可交互文本'),
  toSwatch('accent.subtle', 'colors.accent-subtle', '低强调选中背景'),
  toSwatch('accent.fg', 'colors.accent-fg', '强调填充上的文字'),
  toSwatch('link', 'colors.link', '正文与标题中的链接'),
  toSwatch('link.subtle', 'colors.link-subtle', '弱化的次级链接'),
  toSwatch('link.hover', 'colors.link-hover', '链接悬停与键盘聚焦'),
];

const media: Swatch[] = [
  toSwatch('media.frame.background', 'colors.media-frame-background', '媒体容器背景'),
  toSwatch('media.frame.border', 'colors.media-frame-border', '媒体容器默认边框'),
  toSwatch('media.frame.borderHover', 'colors.media-frame-border-hover', '媒体容器悬停边框'),
];

const navigation: Swatch[] = [
  toSwatch('nav', 'colors.nav', '未选中导航或标签文字'),
  toSwatch('nav.hover', 'colors.nav-hover', '导航或标签悬停文字'),
  toSwatch('nav.active', 'colors.nav-active', '当前导航或标签'),
  toSwatch('nav.activeHover', 'colors.nav-active-hover', '当前导航或标签悬停'),
];

const statuses: Swatch[] = [
  toSwatch('info', 'colors.info', '信息提示'),
  toSwatch('success', 'colors.success', '完成、成功'),
  toSwatch('warning', 'colors.warning', '风险、待注意'),
  toSwatch('danger', 'colors.danger', '删除、失败、破坏性操作'),
  toSwatch('focusRing', 'colors.focus-ring', '统一键盘焦点外环'),
];

const page = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6',
  padding: '5',
  backgroundColor: 'bg.canvas',
});

const groupTitle = css({ textStyle: 'titleSm', color: 'text.primary', marginBottom: '3' });

const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: '3',
});

const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  padding: '2',
  borderRadius: 'sm',
  backgroundColor: 'bg.subtle',
});

const chip = css({
  flexShrink: 0,
  width: '32px',
  height: '32px',
  borderRadius: 'sm',
  border: '1px solid',
  borderColor: 'border.subtle',
});

const name = css({ textStyle: 'label', color: 'text.primary' });
const usage = css({ textStyle: 'meta', color: 'text.secondary' });

function Group({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <section>
      <h3 className={groupTitle}>{title}</h3>
      <div className={grid}>
        {swatches.map((swatch) => (
          <div className={item} key={swatch.name}>
            <div className={chip} style={{ backgroundColor: swatch.value }} />
            <div>
              <div className={name}>{swatch.name}</div>
              <div className={usage}>{swatch.usage}</div>
              <div className={usage}>{swatch.path}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Palette: StoryObj = {
  render: () => (
    <div className={page}>
      <Group title='原始色阶（仅供 token 定义引用）' swatches={palettes} />
      <Group title='表面与边框' swatches={surfaces} />
      <Group title='前景文字' swatches={foregrounds} />
      <Group title='品牌与链接' swatches={accents} />
      <Group title='媒体与导航' swatches={[...media, ...navigation]} />
      <Group title='状态' swatches={statuses} />
    </div>
  ),
};
