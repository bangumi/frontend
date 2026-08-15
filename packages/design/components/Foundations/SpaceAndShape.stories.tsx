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
  '5 · 24px': css({ width: '5' }),
  '6 · 32px': css({ width: '6' }),
  '7 · 48px': css({ width: '7' }),
  '8 · 64px': css({ width: '8' }),
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
};

const shadowBox = css({
  width: '160px',
  height: '72px',
  borderRadius: 'md',
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
        <h3 className={groupTitle}>阴影</h3>
        {Object.entries(shadowBoxes).map(([key, shadow]) => (
          <div className={line} key={key}>
            <span className={label}>{key}</span>
            <div className={`${shadowBox} ${shadow}`} />
          </div>
        ))}
      </section>
    </div>
  ),
};
