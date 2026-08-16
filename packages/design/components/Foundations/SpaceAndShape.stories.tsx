import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { css } from '@bangumi/styled-system/css';

const page = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '6',
  padding: '5',
  fontFamily: 'bgmSans',
  color: 'text.primary',
  backgroundColor: 'bg.canvas',
});

const groupTitle = css({ textStyle: 'titleSm', marginBottom: '3' });
const label = css({
  textStyle: 'meta',
  color: 'text.tertiary',
  fontFamily: 'mono',
  width: '160px',
});
const line = css({ display: 'flex', alignItems: 'center', gap: '3', marginBottom: '2' });
const bar = css({ height: '12px', borderRadius: 'sm', backgroundColor: 'accent' });

const spacingBars = {
  '1 · 4px': css({ width: '1' }),
  '2 · 8px': css({ width: '2' }),
  '3 · 12px': css({ width: '3' }),
  '4 · 16px': css({ width: '4' }),
  '5 · 20px': css({ width: '5' }),
  '6 · 24px': css({ width: '6' }),
  '7 · 32px': css({ width: '7' }),
  '8 · 48px': css({ width: '8' }),
};

const radiiBoxes = {
  'none · 0px': css({ borderRadius: 'none' }),
  'sm · 4px': css({ borderRadius: 'sm' }),
  'md · 8px': css({ borderRadius: 'md' }),
  'pill · 999px': css({ borderRadius: 'pill' }),
};

const swatchBox = css({
  width: '96px',
  height: '48px',
  backgroundColor: 'accent.subtle',
  border: '1px solid',
  borderColor: 'border',
});

const controls = {
  'control.sm · 32px': css({ height: 'control.sm' }),
  'control.md · 42px': css({ height: 'control.md' }),
  'control.lg · 48px': css({ height: 'control.lg' }),
  'touch · 44px': css({ height: 'touch' }),
};

const controlBox = css({
  display: 'inline-flex',
  alignItems: 'center',
  paddingX: '4',
  borderRadius: 'sm',
  textStyle: 'label',
  color: 'accent.fg',
  backgroundColor: 'accent',
});

const shadowBoxes = {
  'shadow.raised': css({ boxShadow: 'raised' }),
  'shadow.overlay': css({ boxShadow: 'overlay' }),
  'surface.panel.shadow': css({ boxShadow: 'surface.panel.shadow' }),
  'media.frame.hover': css({ boxShadow: 'media.frame.hover' }),
};

const shadowBox = css({
  width: '160px',
  height: '72px',
  borderRadius: 'md',
  backgroundColor: 'bg.raised',
});

const semanticSpacing = {
  'layout.inline · 4px': css({ padding: 'layout.inline' }),
  'layout.compact · 8px': css({ padding: 'layout.compact' }),
  'layout.group · 16px': css({ padding: 'layout.group' }),
  'layout.section · 24px': css({ padding: 'layout.section' }),
  'layout.page · 32px': css({ padding: 'layout.page' }),
  'layout.gutter.mobile · 16px': css({ padding: 'layout.gutter.mobile' }),
  'layout.gutter.tablet · 24px': css({ padding: 'layout.gutter.tablet' }),
  'layout.gutter.desktop · 32px': css({ padding: 'layout.gutter.desktop' }),
  'component.list.rowBlock · 8px': css({ padding: 'component.list.rowBlock' }),
  'component.list.rowBlockDense · 4px': css({ padding: 'component.list.rowBlockDense' }),
  'component.media.frame · 4px': css({ padding: 'component.media.frame' }),
  'component.media.caption · 8px': css({ padding: 'component.media.caption' }),
  'component.media.meta · 4px': css({ padding: 'component.media.meta' }),
};

const semanticSpacingBox = css({
  display: 'inline-flex',
  border: '1px dashed',
  borderColor: 'border.strong',
  backgroundColor: 'accent.subtle',
});

const containerWidths = {
  'container.reading · min(100% - 32px, 720px)': css({ width: 'container.reading' }),
  'container.content · min(100% - 32px, 1200px)': css({ width: 'container.content' }),
  'container.wide · min(100% - 48px, 1440px)': css({ width: 'container.wide' }),
  'container.page · 1264px': css({ width: 'container.page', maxWidth: '100%' }),
};

const containerBar = css({
  height: '12px',
  borderRadius: 'sm',
  backgroundColor: 'accent',
});

const breakpoints = ['sm · 480px', 'md · 768px', 'lg · 1024px', 'xl · 1280px', '2xl · 1600px'];
const motion = [
  'duration.fast · 120ms',
  'duration.normal · 200ms',
  'duration.slow · 320ms',
  'easing.standard',
];

const tokenList = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
});

const tokenChip = css({
  paddingX: '2',
  paddingY: '1',
  borderRadius: 'sm',
  backgroundColor: 'bg.muted',
  color: 'text.secondary',
  fontFamily: 'mono',
  fontSize: 'meta',
  lineHeight: 'meta',
});

const borders = {
  'borderWidths.DEFAULT · 1px': css({ border: 'DEFAULT solid', borderColor: 'border.strong' }),
  'component.list.divider': css({ borderTop: 'component.list.divider' }),
};

const borderSample = css({
  width: '160px',
  height: '32px',
  backgroundColor: 'bg.raised',
});

const meta: Meta = {
  title: 'Foundations/Space & Shape',
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Scales: StoryObj = {
  render: () => (
    <div className={page}>
      <section>
        <h3 className={groupTitle}>空间刻度</h3>
        {Object.entries(spacingBars).map(([key, width]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${bar} ${width}`} />
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>圆角</h3>
        {Object.entries(radiiBoxes).map(([key, radius]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${swatchBox} ${radius}`} />
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>控件高度</h3>
        {Object.entries(controls).map(([key, height]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${controlBox} ${height}`}>收藏</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>语义间距</h3>
        {Object.entries(semanticSpacing).map(([key, padding]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${semanticSpacingBox} ${padding}`}>内容</div>
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>内容容器</h3>
        {Object.entries(containerWidths).map(([key, width]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${containerBar} ${width}`} />
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>阴影</h3>
        {Object.entries(shadowBoxes).map(([key, shadow]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${shadowBox} ${shadow}`} />
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>边框</h3>
        {Object.entries(borders).map(([key, border]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${borderSample} ${border}`} />
          </div>
        ))}
      </section>

      <section>
        <h3 className={groupTitle}>断点</h3>
        <div className={tokenList}>
          {breakpoints.map((breakpoint) => (
            <span className={tokenChip} key={breakpoint}>
              {breakpoint}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className={groupTitle}>动效</h3>
        <div className={tokenList}>
          {motion.map((token) => (
            <span className={tokenChip} key={token}>
              {token}
            </span>
          ))}
        </div>
      </section>
    </div>
  ),
};
