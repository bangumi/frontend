import { act, fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import StickerPicker from '@bangumi/design/components/StickerPicker/index.tsx';

it('支持完整目录、混合尺寸、选择与导航', () => {
  window.localStorage.setItem(
    'bangumi-recent-stickers',
    JSON.stringify(['(musume_03)', '(blake_03)', '(bgm24)']),
  );
  const scrollTo = vi.fn();
  const originalScrollTo = Element.prototype.scrollTo;
  Element.prototype.scrollTo = scrollTo;

  try {
    const onSelect = vi.fn();
    const { container } = render(<StickerPicker onSelect={onSelect} />);
    const images = Array.from(container.querySelectorAll<HTMLImageElement>('[role="grid"] img'));
    expect(images).toHaveLength(447);
    expect(
      images.every(
        (image) =>
          image.getAttribute('loading') === 'lazy' &&
          image.getAttribute('decoding') === 'async' &&
          image.hasAttribute('width') &&
          image.hasAttribute('height'),
      ),
    ).toBe(true);

    for (const code of ['(bgm124)', '(bgm125)']) {
      expect(screen.getByRole('button', { name: code }).querySelector('img')).toHaveStyle({
        width: '21px',
        height: '21px',
      });
    }
    const recent = screen.getByRole('grid', { name: '最近使用' });
    for (const button of within(recent).getAllByRole('button', {
      name: '喜欢',
    })) {
      expect(button).toHaveStyle({ width: '56px', height: '56px' });
      expect(button.querySelector('img')).toHaveStyle({ width: '48px', height: '48px' });
    }
    expect(within(recent).getByRole('button', { name: '(bgm24)' })).toHaveStyle({
      width: '30px',
      height: '30px',
    });

    fireEvent.click(screen.getByRole('button', { name: '(bgm01)' }));
    expect(onSelect).toHaveBeenCalledWith('(bgm01)');
    expect(window.localStorage.getItem('bangumi-recent-stickers')).toContain('(bgm01)');

    fireEvent.click(screen.getByRole('button', { name: 'Bangumi 娘 by 貓魚' }));
    expect(scrollTo.mock.instances[0]).toBe(
      container.querySelector('.bgm-sticker-picker__scroller'),
    );

    const first = within(screen.getByRole('region', { name: 'BangumiTV by Cinnamor' })).getByRole(
      'button',
      { name: '(bgm24)' },
    );
    act(() => first.focus());
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('button', { name: '(bgm25)' })).toHaveFocus();
  } finally {
    Element.prototype.scrollTo = originalScrollTo;
    window.localStorage.clear();
  }
}, 30_000);
